import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SHOPS = [
  {
    id: 'trigall',
    name: 'Panadería El Trigall',
    category: 'Panadería',
    qrValue: 'mi-veci://pay/trigall',
    icon: 'storefront',
    color: '#E49A36',
  },
  {
    id: 'esquina',
    name: 'Café de la Esquina',
    category: 'Cafetería',
    qrValue: 'mi-veci://pay/esquina',
    icon: 'cafe',
    color: '#6C3CE1',
  },
];

const STORAGE_KEY = '@mi_veci/rewards-v1';
const DEFAULT_CASHBACK_OFFERS = [
  {
    id: 'cashback-trigall-demo',
    shopId: 'trigall',
    title: 'Ahorra en tu próxima visita',
    percent: 5,
    active: true,
  },
  {
    id: 'cashback-esquina-demo',
    shopId: 'esquina',
    title: 'Un beneficio para tu café',
    percent: 8,
    active: true,
  },
];
const DEFAULT_STATE = {
  promotions: {
    trigall: { active: true, goal: 5, reward: '$2 de cashback' },
    esquina: { active: true, goal: 4, reward: 'Un café gratis' },
  },
  progress: {
    trigall: { current: 0, total: 0, rewards: 0 },
    esquina: { current: 0, total: 0, rewards: 0 },
  },
  cashbackOffers: DEFAULT_CASHBACK_OFFERS,
};

const RewardsContext = createContext(null);

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const restoreState = (storedValue) => {
  if (!isObject(storedValue)) {
    throw new Error('Los datos guardados de Mi Veci no tienen un formato válido.');
  }

  const restored = { promotions: {}, progress: {}, cashbackOffers: [] };
  for (const shop of SHOPS) {
    const promotion = storedValue.promotions?.[shop.id];
    const progress = storedValue.progress?.[shop.id];
    if (
      !isObject(promotion)
      || typeof promotion.active !== 'boolean'
      || !Number.isInteger(promotion.goal)
      || promotion.goal < 2
      || promotion.goal > 20
      || typeof promotion.reward !== 'string'
      || !promotion.reward.trim()
      || !isObject(progress)
      || !Number.isInteger(progress.current)
      || progress.current < 0
      || progress.current >= promotion.goal
      || !Number.isInteger(progress.total)
      || progress.total < 0
      || !Number.isInteger(progress.rewards)
      || progress.rewards < 0
    ) {
      throw new Error(`Los datos guardados de ${shop.name} no son válidos.`);
    }
    restored.promotions[shop.id] = {
      active: promotion.active,
      goal: promotion.goal,
      reward: promotion.reward,
    };
    restored.progress[shop.id] = {
      current: progress.current,
      total: progress.total,
      rewards: progress.rewards,
    };
  }

  const cashbackOffers = storedValue.cashbackOffers ?? DEFAULT_CASHBACK_OFFERS;
  if (!Array.isArray(cashbackOffers)) {
    throw new Error('Las ofertas de cashback guardadas no tienen un formato válido.');
  }
  const offerIds = new Set();
  restored.cashbackOffers = cashbackOffers.map((offer) => {
    if (
      !isObject(offer)
      || typeof offer.id !== 'string'
      || !offer.id.trim()
      || offerIds.has(offer.id)
      || !SHOPS.some((shop) => shop.id === offer.shopId)
      || typeof offer.title !== 'string'
      || offer.title.trim().length < 4
      || offer.title.trim().length > 50
      || !Number.isInteger(offer.percent)
      || offer.percent < 1
      || offer.percent > 50
      || typeof offer.active !== 'boolean'
    ) {
      throw new Error('Una de las ofertas de cashback guardadas no es válida.');
    }
    offerIds.add(offer.id);
    return {
      id: offer.id,
      shopId: offer.shopId,
      title: offer.title.trim(),
      percent: offer.percent,
      active: offer.active,
    };
  });
  return restored;
};

export const RewardsProvider = ({ children }) => {
  const [state, setState] = useState(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const stateRef = useRef(DEFAULT_STATE);
  const operationQueue = useRef(Promise.resolve());

  useEffect(() => {
    let mounted = true;
    const hydrate = async () => {
      try {
        const savedState = await AsyncStorage.getItem(STORAGE_KEY);
        const nextState = savedState ? restoreState(JSON.parse(savedState)) : DEFAULT_STATE;
        if (mounted) {
          stateRef.current = nextState;
          setState(nextState);
          setReady(true);
        }
      } catch (error) {
        if (mounted) {
          setLoadError(error instanceof Error ? error.message : 'No se pudieron cargar los datos de Mi Veci.');
        }
      }
    };

    hydrate();
    return () => {
      mounted = false;
    };
  }, []);

  const enqueueUpdate = (update) => {
    const operation = operationQueue.current.then(async () => {
      if (!ready) {
        throw new Error('Espera a que carguen los datos de Mi Veci.');
      }
      const result = update(stateRef.current);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(result.state));
      stateRef.current = result.state;
      setState(result.state);
      return result.value;
    });
    operationQueue.current = operation.then(() => undefined, () => undefined);
    return operation;
  };

  const setPromotion = (shopId, changes) => enqueueUpdate((currentState) => {
    if (!SHOPS.some((shop) => shop.id === shopId)) {
      throw new Error('No se encontró el comercio de esta promoción.');
    }
    const previousPromotion = currentState.promotions[shopId];
    const nextPromotion = { ...previousPromotion, ...changes };
    if (
      !Number.isInteger(nextPromotion.goal)
      || nextPromotion.goal < 2
      || nextPromotion.goal > 20
      || typeof nextPromotion.reward !== 'string'
      || !nextPromotion.reward.trim()
    ) {
      throw new Error('La meta debe ser de 2 a 20 compras y el premio no puede estar vacío.');
    }
    const objectiveChanged = (
      previousPromotion.goal !== nextPromotion.goal
      || previousPromotion.reward !== nextPromotion.reward
    );
    const nextState = {
      ...currentState,
      promotions: { ...currentState.promotions, [shopId]: nextPromotion },
      progress: objectiveChanged
        ? {
          ...currentState.progress,
          [shopId]: { ...currentState.progress[shopId], current: 0 },
        }
        : currentState.progress,
    };
    return { state: nextState };
  });

  const recordDemoPurchase = (shopId, amount) => enqueueUpdate((currentState) => {
    const shop = SHOPS.find((item) => item.id === shopId);
    if (!shop) throw new Error('El QR no corresponde a un comercio registrado.');
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Ingresa un monto de compra válido.');
    }

    const promotion = currentState.promotions[shopId];
    const previousProgress = currentState.progress[shopId];
    if (!promotion.active) {
      return {
        state: currentState,
        value: { shop, counted: false, progress: previousProgress, promotion },
      };
    }

    const reachedGoal = previousProgress.current + 1 >= promotion.goal;
    const progress = {
      current: reachedGoal ? 0 : previousProgress.current + 1,
      total: previousProgress.total + 1,
      rewards: previousProgress.rewards + (reachedGoal ? 1 : 0),
    };
    const nextState = {
      ...currentState,
      progress: { ...currentState.progress, [shopId]: progress },
    };
    return {
      state: nextState,
      value: { shop, counted: true, reachedGoal, progress, promotion },
    };
  });

  const saveCashbackOffer = (offerDraft) => enqueueUpdate((currentState) => {
    const title = typeof offerDraft.title === 'string' ? offerDraft.title.trim() : '';
    if (!SHOPS.some((shop) => shop.id === offerDraft.shopId)) {
      throw new Error('Selecciona un local para esta oferta.');
    }
    if (title.length < 4 || title.length > 50) {
      throw new Error('El nombre de la oferta debe tener entre 4 y 50 caracteres.');
    }
    if (!Number.isInteger(offerDraft.percent) || offerDraft.percent < 1 || offerDraft.percent > 50) {
      throw new Error('El cashback debe ser un porcentaje entero entre 1 % y 50 %.');
    }

    const existingOffer = offerDraft.id
      ? currentState.cashbackOffers.find((offer) => offer.id === offerDraft.id)
      : null;
    if (offerDraft.id && !existingOffer) {
      throw new Error('No se encontró la oferta que intentas editar.');
    }

    const offer = {
      id: existingOffer?.id || `cashback-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      shopId: offerDraft.shopId,
      title,
      percent: offerDraft.percent,
      active: existingOffer?.active ?? true,
    };
    const cashbackOffers = existingOffer
      ? currentState.cashbackOffers.map((item) => (item.id === offer.id ? offer : item))
      : [...currentState.cashbackOffers, offer];
    return {
      state: { ...currentState, cashbackOffers },
      value: offer,
    };
  });

  const setCashbackOfferActive = (offerId, active) => enqueueUpdate((currentState) => {
    if (typeof active !== 'boolean') {
      throw new Error('El estado de la oferta no es válido.');
    }
    const offerExists = currentState.cashbackOffers.some((offer) => offer.id === offerId);
    if (!offerExists) {
      throw new Error('No se encontró la oferta que intentas actualizar.');
    }
    return {
      state: {
        ...currentState,
        cashbackOffers: currentState.cashbackOffers.map((offer) => (
          offer.id === offerId ? { ...offer, active } : offer
        )),
      },
    };
  });

  const contextValue = useMemo(() => ({
    shops: SHOPS,
    promotions: state.promotions,
    progress: state.progress,
    cashbackOffers: state.cashbackOffers,
    ready,
    loadError,
    setPromotion,
    recordDemoPurchase,
    saveCashbackOffer,
    setCashbackOfferActive,
  }), [state, ready, loadError]);

  return <RewardsContext.Provider value={contextValue}>{children}</RewardsContext.Provider>;
};

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards debe utilizarse dentro de RewardsProvider.');
  }
  return context;
};
