import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { useAppData } from '../../contexts/AppDataContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { listings, karmaPoints } = useAppData();   // Real karma from context

  const myOffers = listings.filter(item => item.postedBy === 'You');
  const myClaims = listings.filter(item => item.claimedBy === 'You');

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: async () => await logout() },
    ]);
  };

  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets?.[0]) {
      Alert.alert('Profile Picture Updated!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f1f8e9" />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickProfileImage}>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>🌿</Text>
            </View>
            <View style={styles.plusIcon}>
              <Ionicons name="add-circle" size={28} color="#4caf50" />
            </View>
          </TouchableOpacity>

          <Text style={styles.name}>{user?.name || 'April Dawn C. Enemenzo'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <Text style={styles.karma}>Karma Points: {karmaPoints}</Text>
        </View>

        <Text style={styles.sectionTitle}>My Offers</Text>
        {myOffers.length === 0 ? (
          <Text style={styles.empty}>You haven't posted anything yet.</Text>
        ) : (
          myOffers.map(item => (
            <View key={item.id} style={styles.smallCard}>
              <Text style={styles.smallTitle}>{item.title}</Text>
              <Text style={styles.smallSubtitle}>{item.karma} pts • {item.location}</Text>
            </View>
          ))
        )}

        <Text style={styles.sectionTitle}>My Claims</Text>
        {myClaims.length === 0 ? (
          <Text style={styles.empty}>You haven't claimed anything yet.</Text>
        ) : (
          myClaims.map(item => (
            <View key={item.id} style={styles.smallCard}>
              <Text style={styles.smallTitle}>{item.title}</Text>
              <Text style={styles.smallSubtitle}>{item.karma} pts • Claimed</Text>
            </View>
          ))
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f1f8e9',
  },
  container: { 
    padding: 20 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 30 
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: { 
    width: 90, 
    height: 90, 
    borderRadius: 45, 
    backgroundColor: '#c8e6c9', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  avatarEmoji: { 
    fontSize: 45 
  },
  plusIcon: {
    position: 'absolute',
    bottom: 8,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 2,
  },
  name: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#2e7d32' 
  },
  email: { 
    fontSize: 16, 
    color: '#666' 
  },
  karma: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#f57f17', 
    marginTop: 10 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#2e7d32', 
    marginTop: 20, 
    marginBottom: 10 
  },
  smallCard: { 
    backgroundColor: '#fff', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    elevation: 2 
  },
  smallTitle: { 
    fontSize: 16, 
    fontWeight: '600' 
  },
  smallSubtitle: { 
    fontSize: 13, 
    color: '#666', 
    marginTop: 4 
  },
  empty: { 
    color: '#999', 
    fontStyle: 'italic', 
    marginVertical: 10 
  },
  logoutBtn: { 
    marginTop: 40, 
    backgroundColor: '#ef5350', 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});