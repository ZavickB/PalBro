import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
  }, [result]);

  return (
    <View style={styles.container}>
      <Button
        title="open picker for single JSON file selection"
        onPress={async () => {
          try {
            const { type, uri, name, size } = await DocumentPicker.getDocumentAsync({
              type: 'application/json',
            });
            if (type === 'success') {
              setResult({ uri, name, size });
            } else {
              console.log('Document picker canceled or failed');
            }
          } catch (error) {
            console.error('Error picking document: ', error);
          }
        }}
      />
      <Text selectable>Result: {JSON.stringify(result, null, 2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
