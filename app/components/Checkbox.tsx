import { useState, useEffect} from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { View, Text } from 'react-native';
import { BACKGROUND_COLOR } from '../consts';
import { Tag } from '../api/data_types';
import { getMatchData, updateTags } from '../api/data';

interface CheckboxProps {
  tag: Tag;
}

function Checkbox({ tag }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMatchData().then((data) => {
      setChecked(data["tags"].includes(tag));
    });
  }, []);

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }]}>

    <PaperCheckbox.Android
      color={BACKGROUND_COLOR}
      status={checked ? 'checked' : 'unchecked'}
      onPress={() => {
        updateTags(tag, checked);
        setChecked(!checked);
      }}
    />
    <Text>{tag}</Text>

    </View>
  )
}

export default Checkbox;