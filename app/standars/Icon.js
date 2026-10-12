import * as AllIcons from '@expo/vector-icons/';

export const MyIcon = (props) => {
  const { SelectedIcon, name, color, size } = props
  const IconComponent = AllIcons[SelectedIcon];
  return <IconComponent name={name} color={color ? color:'black'} size={size ? size:25} />;
};