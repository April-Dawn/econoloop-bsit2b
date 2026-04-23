import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../../contexts/AppDataContext';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function GiveHelpScreen() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [karma, setKarma] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);

  const { addListing } = useAppData();
  const navigation = useNavigation();

  const pickImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const handlePost = async () => {
    if (!title.trim() || !desc.trim()) {
      return Alert.alert('Error', 'Title and description are required');
    }

    setLoading(true);
    try {
      await addListing({
        type: 'offer',
        title: title.trim(),
        description: desc.trim(),
        karma: karma ? parseInt(karma) || 0 : 0,
        location: 'CHMSU Alijis Campus',
        imageUris: images.filter(Boolean),   // ← 3 photos saved correctly
      });

      Alert.alert('Success!', 'Your offer is now live in Eco-Feed!', [
        {
          text: 'OK',
          onPress: () => {
            setTitle(''); setDesc(''); setKarma(''); setImages([null, null, null]);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (e) {
      Alert.alert('Failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.header}>Offer Help</Text>
      <Text style={styles.subHeader}>Share items with the campus community</Text>

      <View style={styles.formCard}>
        <Text style={styles.label}>Item / Service Title</Text>
        <TextInput style={styles.input} placeholder="e.g. Speaker" value={title} onChangeText={setTitle} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={[styles.input, styles.textarea]} placeholder="Condition, brand, pickup details..." multiline value={desc} onChangeText={setDesc} />

        <Text style={styles.label}>Karma Requested (0 = Free)</Text>
        <TextInput style={styles.input} placeholder="10 - 100" keyboardType="numeric" value={karma} onChangeText={setKarma} />

        <Text style={styles.label}>Photos (max 3)</Text>
        <View style={styles.photoRow}>
          {images.map((uri, i) => (
            <View key={i} style={styles.photoContainer}>
              <TouchableOpacity style={styles.photoSlot} onPress={() => pickImage(i)}>
                {uri ? <Image source={{ uri }} style={styles.preview} /> : <Text style={styles.addIcon}>+</Text>}
              </TouchableOpacity>
              {uri && (
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(i)}>
                  <Ionicons name="close-circle" size={24} color="#f44336" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.submitBtn, loading && styles.disabled]} onPress={handlePost} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitText}>Post Offer</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9', padding: 16 },
  header: { fontSize: 26, fontWeight: '700', color: '#2e7d32', textAlign: 'center', marginTop: 10 },
  subHeader: { fontSize: 14, color: '#4e6b4e', textAlign: 'center', marginBottom: 20 },
  formCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, elevation: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#33691e', marginTop: 16, marginBottom: 6 },
  input: { backgroundColor: '#f9fff9', borderRadius: 12, padding: 14, fontSize: 16, borderWidth: 1, borderColor: '#d0e8d0' },
  textarea: { height: 120, textAlignVertical: 'top' },
  photoRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
  photoContainer: { position: 'relative' },
  photoSlot: { width: (width - 100) / 3, height: 100, borderRadius: 12, borderWidth: 2, borderColor: '#c8e6c9', backgroundColor: '#f0f7f0', justifyContent: 'center', alignItems: 'center' },
  preview: { width: '100%', height: '100%', borderRadius: 12 },
  addIcon: { fontSize: 40, color: '#81c784' },
  removeBtn: { position: 'absolute', top: -8, right: -8, backgroundColor: '#fff', borderRadius: 12 },
  submitBtn: { backgroundColor: '#4caf50', padding: 16, borderRadius: 14, alignItems: 'center', marginTop: 20 },
  disabled: { backgroundColor: '#a5d6a7' },
  submitText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});