import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useAppData } from '../../contexts/AppDataContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { listings } = useAppData();
  const navigation = useNavigation();

  // Separate offers and requests
  const offers = listings.filter(item => item.type === 'offer');
  const requests = listings.filter(item => item.type === 'request');

  const goToTakeHelp = () => navigation.navigate('Take');

  // Render multiple images horizontally
  const renderImages = (imageUris) => {
    if (!imageUris || imageUris.length === 0) return null;

    return (
      <FlatList
        data={imageUris}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(uri, index) => index.toString()}
        renderItem={({ item: uri }) => (
          <Image source={{ uri }} style={styles.cardImage} />
        )}
        contentContainerStyle={styles.imageContainer}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>EconoLoop</Text>
      <Text style={styles.subHeader}>Campus Sharing Economy • Earn Karma</Text>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionBtn} onPress={goToTakeHelp}>
          <Text style={styles.actionText}>Take Help</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionBtn, { backgroundColor: '#2e7d32' }]} 
          onPress={() => navigation.navigate('Give')}
        >
          <Text style={styles.actionText}>Give Help</Text>
        </TouchableOpacity>
      </View>

      {/* Available Offers */}
      <Text style={styles.sectionTitle}>Available Offers (Claimable)</Text>
      {offers.length === 0 ? (
        <Text style={styles.empty}>No offers available yet. Be the first to give help!</Text>
      ) : (
        offers.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Show all posted pictures */}
            {renderImages(item.imageUris)}

            <View style={styles.labelBadge}>
              <Text style={styles.offerLabel}>OFFER • CLAIMABLE</Text>
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.meta}>
              <Text style={styles.karmaText}>
                {item.karma || item.karmaCost || 0} Karma Points
              </Text>
              <Text style={styles.location}>
                📍 {item.location || 'CHMSU Campus'}
              </Text>
            </View>

            <Text style={styles.postedBy}>Posted by: {item.postedBy}</Text>
          </View>
        ))
      )}

      {/* Requests from Others */}
      <Text style={styles.sectionTitle}>What Others Need (Requests)</Text>
      {requests.length === 0 ? (
        <Text style={styles.empty}>No active requests at the moment.</Text>
      ) : (
        requests.map(item => (
          <View key={item.id} style={styles.card}>
            {/* Show all posted pictures for requests too */}
            {renderImages(item.imageUris)}

            <View style={styles.labelBadge}>
              <Text style={styles.requestLabel}>REQUEST</Text>
            </View>

            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>

            <View style={styles.meta}>
              <Text style={styles.karmaText}>
                Offering {item.karma || 0} Karma Points
              </Text>
              <Text style={styles.location}>
                📍 {item.location || 'CHMSU Campus'}
              </Text>
            </View>

            <Text style={styles.postedBy}>Requested by: {item.postedBy}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f1f8e9', 
    padding: 16 
  },
  headerTitle: { 
    fontSize: 28, 
    fontWeight: '700', 
    color: '#2e7d32', 
    textAlign: 'center' 
  },
  subHeader: { 
    fontSize: 14, 
    color: '#4e6b4e', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  quickActions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 25 
  },
  actionBtn: { 
    backgroundColor: '#ff7043', 
    paddingVertical: 14, 
    paddingHorizontal: 30, 
    borderRadius: 12, 
    flex: 1, 
    marginHorizontal: 6, 
    alignItems: 'center' 
  },
  actionText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#2e7d32', 
    marginTop: 15, 
    marginBottom: 12 
  },
  card: { 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 16, 
    marginBottom: 16, 
    elevation: 4 
  },
  imageContainer: {
    marginBottom: 12,
  },
  cardImage: { 
    width: 220, 
    height: 160, 
    borderRadius: 12, 
    marginRight: 10 
  },
  labelBadge: { 
    marginBottom: 10 
  },
  offerLabel: { 
    backgroundColor: '#2e7d32', 
    color: '#fff', 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 20, 
    fontSize: 12, 
    fontWeight: '600',
    alignSelf: 'flex-start' 
  },
  requestLabel: { 
    backgroundColor: '#f57f17', 
    color: '#fff', 
    paddingHorizontal: 12, 
    paddingVertical: 5, 
    borderRadius: 20, 
    fontSize: 12, 
    fontWeight: '600',
    alignSelf: 'flex-start' 
  },
  cardTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 6 
  },
  cardDesc: { 
    fontSize: 14, 
    color: '#555', 
    marginBottom: 10, 
    lineHeight: 20 
  },
  meta: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 8, 
    marginBottom: 8 
  },
  karmaText: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#f57f17' 
  },
  location: { 
    fontSize: 14, 
    color: '#666' 
  },
  postedBy: { 
    fontSize: 13, 
    color: '#777', 
    marginTop: 6 
  },
  empty: { 
    color: '#999', 
    fontStyle: 'italic', 
    textAlign: 'center', 
    marginVertical: 20,
    fontSize: 15 
  },
});