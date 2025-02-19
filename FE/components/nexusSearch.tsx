import React, { useState } from 'react';
import { Platform, View, TextInput, Button, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

// Web-specific imports
const isWeb = Platform.OS === 'web';

const NexusSearch = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
      setResponse('');
  }

  const handleSearch = async () => {
    if (!query.trim()) {
      alert("Please enter a query!");
      return;
    }

    setLoading(true);
    setResponse('');

    try {
      const {data} = await axios.post(
              'http://192.168.1.8:5000/api/search',
              { query },
              { headers: { "Content-Type": "application/json" } }
          );
      console.log('Response Data:', data);
      setResponse(data.output || 'No response received');
    } catch (error) {
      console.error("Axios Error:", error);
      setResponse('Error fetching response.');
    } finally {
      setLoading(false);
    }
  };

  if (isWeb) {
    // Web Version
    return (
      <div style={webStyles.container}>
        <input
          type="text"
          placeholder="Ask something..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={webStyles.input}
        />
        <button onClick={handleSearch} style={webStyles.button}>Search</button>
        <div style={webStyles.responseContainer}>
          {loading ? <p style={webStyles.loadingText}>Loading...</p> : <p style={webStyles.responseText}>{response}</p>}
        </div>

      </div>
    );
  }

  // Mobile Version (React Native)
  return (
    <View style={nativeStyles.container}>
      <TextInput
        style={nativeStyles.input}
        placeholder="Ask something..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
      <Text></Text>
      <Button style={nativeStyles.clearBtn} title="Clear" onPress={handleClear} />
      <ScrollView style={nativeStyles.responseContainer}>
        {loading ? <Text style={nativeStyles.loadingText}>Loading...</Text> : <Text style={nativeStyles.responseText}>{response}</Text>}
      </ScrollView>

    </View>
  );
};

// Styles for React Native (Android/iOS)
const nativeStyles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  responseContainer: { marginTop: 10, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  loadingText: { fontStyle: 'italic', color: 'gray' },
  responseText: { fontSize: 16, color: 'black' },
  clearBtn: { width:10 }
});

// Styles for Web
const webStyles = {
  container: { padding: 20, maxWidth: '400px', margin: 'auto' },
  input: { width: '400px', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none' },
  responseContainer: { marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' },
  loadingText: { fontStyle: 'italic', color: 'gray' },
  responseText: { fontSize: '16px', color: 'black' }
};

export default NexusSearch;
