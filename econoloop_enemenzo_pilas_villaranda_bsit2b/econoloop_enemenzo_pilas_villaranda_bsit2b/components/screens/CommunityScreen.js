import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAppData } from '../../contexts/AppDataContext';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityScreen() {
  const { karmaPoints } = useAppData();

  const joinEvent = (eventName, bonusKarma, description) => {
    Alert.alert(
      '🎉 Event Joined!',
      `${description}\n\nYou earned +${bonusKarma} Karma Points for participating!`,
      [{ text: 'Thank You' }]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Community Hub</Text>
        <Text style={styles.subTitle}>
          Connect with fellow eco-warriors • Share • Grow • Celebrate Impact
        </Text>
      </View>

      {/* Success Stories */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>
          <Ionicons name="sparkles" size={22} color="#f57f17" /> Success Stories
        </Text>

        <View style={styles.storyCard}>
          <Text style={styles.story}>
            "Thanks to EconoLoop, I gave away my barely used laptop and received 180 karma points. 
            The student who claimed it is now doing better in his online classes. This platform is changing lives!"
          </Text>
          <Text style={styles.author}>— Marco Villanueva, BSA 2nd Year</Text>
        </View>

        <View style={styles.storyCard}>
          <Text style={styles.story}>
            "I claimed a set of highlighters and textbooks worth 80 karma. In return, I shared my old reviewers. 
            Real circular economy in action on campus!"
          </Text>
          <Text style={styles.author}>— Kyla Mae Rivera, BSIT 3rd Year</Text>
        </View>
      </View>

      {/* Featured Challenge */}
      <View style={styles.featuredSection}>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredText}>BIG REWARD</Text>
        </View>
        <Text style={styles.featuredTitle}>Zero Waste Innovation Challenge 2026</Text>
        <Text style={styles.featuredDesc}>
          Design a creative solution to reduce plastic or food waste on campus. 
          Submit your idea or prototype.
        </Text>
        <Text style={styles.rewardText}>
          🏆 1st Place: <Text style={{ fontWeight: '700' }}>1,000 Karma Points</Text>{'\n'}
          2nd Place: 600 Karma Points • 3rd Place: 300 Karma Points
        </Text>

        <TouchableOpacity 
          style={styles.joinBigBtn}
          onPress={() => joinEvent(
            'Zero Waste Innovation Challenge', 
            80, 
            'Thank you for joining the biggest sustainability challenge this semester!'
          )}
        >
          <Text style={styles.joinBigBtnText}>Join Challenge Now</Text>
        </TouchableOpacity>
      </View>

      {/* Upcoming Events */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Upcoming Events</Text>

        <TouchableOpacity 
          style={styles.eventCard}
          onPress={() => joinEvent('Alijis Eco Swap Meet', 45, 'Great job participating in the campus swap!')}
        >
          <Ionicons name="swap-horizontal-outline" size={28} color="#2e7d32" />
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>Alijis Eco Swap Meet</Text>
            <Text style={styles.eventDate}>March 28, 2026 • 8:00 AM - 12:00 PM</Text>
            <Text style={styles.eventDesc}>Bring items you no longer need and swap sustainably. Networking + fun!</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.eventCard}
          onPress={() => joinEvent('Campus E-Waste Drive', 65, 'Thank you for helping keep our campus clean!')}
        >
          <Ionicons name="recycle-outline" size={28} color="#2e7d32" />
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>E-Waste Collection & Awareness Drive</Text>
            <Text style={styles.eventDate}>April 10, 2026 • Main Campus Quadrangle</Text>
            <Text style={styles.eventDesc}>Proper disposal of electronics + educational talks. Earn karma while making impact.</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Winners & Testimonials */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recent Winners & Impact</Text>

        <View style={styles.winnerCard}>
          <Text style={styles.winnerBadge}>🏆 CHALLENGE WINNER</Text>
          <Text style={styles.winnerName}>Jade Rivera • BS Environmental Science</Text>
          <Text style={styles.review}>
            "My reusable tumbler return system using QR codes won 1st place! 
            The 1,000 karma points motivated me to turn this into a real campus project. 
            EconoLoop is more than just trading — it's building a greener future."
          </Text>
          <Text style={styles.winnerDate}>March 2026 • 1,000 Karma Awarded</Text>
        </View>
      </View>

      {/* Karma Leaders */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Top Eco Champions</Text>
        <View style={styles.leaderboard}>
          <Text style={styles.leader}>🥇 Juan Dela Cruz — 1,420 pts</Text>
          <Text style={styles.leader}>🥈 Maria Santos — 1,180 pts</Text>
          <Text style={styles.leader}>🥉 April Dawn Enemenzo — {karmaPoints} pts</Text>
          <Text style={styles.leader}>4. Rafael Lim — 920 pts</Text>
          <Text style={styles.leader}>5. Sophia Reyes — 850 pts</Text>
        </View>
      </View>

      <Text style={styles.motivation}>
        Every item you give, every event you join, and every challenge you take — 
        you're helping build a more sustainable CHMSU.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 28,
  },
  pageTitle: {
    fontSize: 29,
    fontWeight: '700',
    color: '#2e7d32',
  },
  subTitle: {
    fontSize: 15.5,
    color: '#4e6b4e',
    textAlign: 'center',
    marginTop: 6,
  },
  section: {
    marginBottom: 34,
  },
  sectionHeader: {
    fontSize: 21,
    fontWeight: '700',
    color: '#33691e',
    marginBottom: 14,
  },
  storyCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    elevation: 3,
    marginBottom: 14,
  },
  story: {
    fontSize: 15.5,
    lineHeight: 24,
    color: '#1b5e20',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    fontStyle: 'italic',
  },
  featuredSection: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#f57f17',
    marginBottom: 34,
  },
  featuredBadge: {
    backgroundColor: '#f57f17',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 10,
  },
  featuredText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
  },
  featuredTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  featuredDesc: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
    marginBottom: 12,
  },
  rewardText: {
    fontSize: 15,
    color: '#d84315',
    marginBottom: 16,
  },
  joinBigBtn: {
    backgroundColor: '#2e7d32',
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  joinBigBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  eventContent: {
    flex: 1,
    marginLeft: 14,
  },
  eventTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 13.5,
    color: '#555',
    marginBottom: 6,
  },
  eventDesc: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  winnerCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 18,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: '#f57f17',
  },
  winnerBadge: {
    color: '#f57f17',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 8,
  },
  winnerName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 10,
  },
  review: {
    fontSize: 15,
    lineHeight: 23,
    color: '#1b5e20',
    fontStyle: 'italic',
  },
  winnerDate: {
    marginTop: 12,
    fontSize: 13,
    color: '#777',
    textAlign: 'right',
  },
  leaderboard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 3,
  },
  leader: {
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    color: '#2e7d32',
  },
  motivation: {
    textAlign: 'center',
    fontSize: 14.5,
    color: '#4e6b4e',
    fontStyle: 'italic',
    marginTop: 20,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
});