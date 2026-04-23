import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { useAppData } from '../../contexts/AppDataContext';
import { useNavigation } from '@react-navigation/native';

export default function TakeHelpScreen() {
  const { 
    listings, 
    addListing, 
    claimItem, 
    karmaPoints = 0, 
    monthlyClaims = 0, 
    maxMonthlyClaims = 5 
  } = useAppData();

  const navigation = useNavigation();

  const [search, setSearch] = useState('');
  const [requestTitle, setRequestTitle] = useState('');
  const [requestDesc, setRequestDesc] = useState('');
  const [requestKarma, setRequestKarma] = useState('');

  // Filter only offers from others (not your own)
  const offers = listings.filter(item => 
    item.type === 'offer' && item.postedBy !== 'You'
  );

  const filteredOffers = search 
    ? offers.filter(item => 
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())
      )
    : offers;

  const postRequest = async () => {
    if (!requestTitle.trim()) {
      return Alert.alert('Error', 'Title is required');
    }

    await addListing({
      type: 'request',
      title: requestTitle.trim(),
      description: requestDesc.trim(),
      karma: parseInt(requestKarma) || 0,
      location: 'CHMSU Campus',
    });

    Alert.alert('Success', 'Your request has been posted!');
    setRequestTitle('');
    setRequestDesc('');
    setRequestKarma('');
  };

  const handleClaim = async (item) => {
    const itemKarma = item.karma || item.karmaCost || 0;

    // 1. Not enough karma
    if (karmaPoints < itemKarma) {
      Alert.alert(
        'Not Enough Karma',
        `You need ${itemKarma} karma points to claim "${item.title}".\nYou currently have ${karmaPoints} points.`,
        [{ text: 'OK' }]
      );
      return;
    }

    // 2. Monthly limit reached
    if (monthlyClaims >= maxMonthlyClaims) {
      Alert.alert(
        'Monthly Limit Reached',
        `You have already claimed the maximum (${maxMonthlyClaims}) items this month.\nPlease try again next month.`,
        [{ text: 'OK' }]
      );
      return;
    }

    // 3. All good → claim and go to chat
    try {
      const result = await claimItem(item.id);
      navigation.navigate('Chat', { transactionId: result.transactionId });
    } catch (e) {
      Alert.alert('Cannot Claim', e.message || 'Something went wrong');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Take Help</Text>

      {/* Post a Request */}
      <View style={styles.postCard}>
        <Text style={styles.label}>What do you need help with?</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. Running Shoes, Notebook, Calculator" 
          value={requestTitle} 
          onChangeText={setRequestTitle} 
        />
        <TextInput 
          style={[styles.input, { height: 80 }]} 
          placeholder="Additional description..." 
          multiline 
          value={requestDesc} 
          onChangeText={setRequestDesc} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Karma points you are willing to give (optional)" 
          keyboardType="numeric" 
          value={requestKarma} 
          onChangeText={setRequestKarma} 
        />
        <TouchableOpacity style={styles.postBtn} onPress={postRequest}>
          <Text style={styles.postBtnText}>Post My Request</Text>
        </TouchableOpacity>
      </View>

      {/* Search Offers */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search available offers..."
        value={search}
        onChangeText={setSearch}
      />

      {filteredOffers.length === 0 ? (
        <Text style={styles.empty}>No offers available at the moment.</Text>
      ) : (
        filteredOffers.map(item => (
          <View key={item.id} style={styles.card}>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.cardImage} />}
            
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
            
            <View style={styles.meta}>
              <Text style={styles.karma}>{item.karma || item.karmaCost || 0} Karma Points</Text>
              <Text style={styles.location}>📍 {item.location || 'CHMSU Campus'}</Text>
            </View>

            <TouchableOpacity 
              style={styles.claimBtn} 
              onPress={() => handleClaim(item)}
            >
              <Text style={styles.claimText}>Claim This Item</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9', padding: 16 },
  title: { fontSize: 28, fontWeight: '700', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
  postCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 20, elevation: 3 },
  label: { fontSize: 16, fontWeight: '600', color: '#33691e', marginBottom: 10 },
  input: { 
    backgroundColor: '#f9fff9', 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#d0e8d0' 
  },
  postBtn: { backgroundColor: '#ff7043', padding: 14, borderRadius: 12, alignItems: 'center' },
  postBtnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  searchInput: { 
    backgroundColor: '#fff', 
    padding: 14, 
    borderRadius: 12, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },
  empty: { textAlign: 'center', color: '#999', marginTop: 40, fontSize: 16 },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 15, 
    elevation: 3 
  },
  cardImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  cardDesc: { fontSize: 14, color: '#555', marginBottom: 10 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  karma: { fontSize: 16, fontWeight: '700', color: '#f57f17' },
  location: { fontSize: 14, color: '#666' },
  claimBtn: { 
    backgroundColor: '#4caf50', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 12 
  },
  claimText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});