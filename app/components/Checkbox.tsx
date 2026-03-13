import { useState, useEffect } from 'react';
import { Checkbox as PaperCheckbox } from 'react-native-paper';
import { View, Text } from 'react-native';
import { BACKGROUND_COLOR } from '../consts';
import { getMatchData } from '../api/data';
import { MatchData } from '../api/data_types';

interface CheckboxProps {
  label: string;
  getChecked: (data: MatchData) => boolean;
  update: (remove: boolean) => Promise<void>;
}

function Checkbox({ label, getChecked, update }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    getMatchData().then((data) => {
      setChecked(getChecked(data));
    });
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <PaperCheckbox.Android
        color={BACKGROUND_COLOR}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          const newState = !checked;
          setChecked(newState);
          update(!newState);
        }}
      />
      <Text>{label}</Text>
    </View>
  );
}

export default Checkbox;