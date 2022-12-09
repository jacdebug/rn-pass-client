import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import {HeaderWithLogo} from './HeaderWithLogo';
import {downloadZip, extract, ZIP_EXTRACT_DIR, getRepo} from './utils';

export const DownloadRepo = ({onDownload}: {onDownload: () => void}) => {
  const [zipUrl, setZipUrl] = React.useState('');

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <HeaderWithLogo />
          <View style={styles.pad20}>
            <Text>Get the downloadable zip fileurl for your repo</Text>
            <TextInput
              placeholder="Git repo zip url"
              onChangeText={newText => setZipUrl(newText)}
              defaultValue={zipUrl}
              style={styles.input}
            />
            <Button
              title="Download"
              onPress={async () => {
                const path = await downloadZip(zipUrl);
                await extract(path, ZIP_EXTRACT_DIR);
                const repo = await getRepo(ZIP_EXTRACT_DIR);
                onDownload();
                Alert.alert('Downloaded and extracted repo' + repo.name);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pad20: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 40,
    marginBottom: 20,
  },
});
