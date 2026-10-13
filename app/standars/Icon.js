import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ICONS = {
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
};

export const MyIcon = (props) => {
  const { SelectedIcon, name, color, size } = props
  const IconComponent = ICONS[SelectedIcon];
  return <IconComponent name={name} color={color ? color:'black'} size={size ? size:25} />;
};