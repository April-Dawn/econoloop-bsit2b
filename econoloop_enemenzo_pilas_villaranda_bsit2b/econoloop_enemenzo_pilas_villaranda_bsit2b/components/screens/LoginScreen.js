import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleAuth = async () => {
    const cleanedEmail = email.trim().toLowerCase();
    if (!cleanedEmail || !password) return Alert.alert('Missing Fields', 'Please enter email and password.');
    if (!cleanedEmail.endsWith('@chmsu.edu.ph')) return Alert.alert('Invalid Email', 'Only @chmsu.edu.ph emails allowed.');
    if (password.length < 6) return Alert.alert('Invalid Password', 'Password must be at least 6 characters.');

    setLoading(true);
    try {
      if (isLogin) await login(cleanedEmail, password);
      else {
        Alert.alert('Account Created', 'You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Text style={styles.logo}>♻️</Text>
          <Text style={styles.title}>EconoLoop</Text>

          <Text style={styles.groupLabel}>Group Members:</Text>
          <Text style={styles.groupMembers}>PILAS • ENEMENZO • VILLARANDA</Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>School Email</Text>
            <TextInput style={styles.input} placeholder="yourname@chmsu.edu.ph" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />

            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#2e7d32" />
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#4caf50" style={{ marginVertical: 20 }} />
          ) : (
            <TouchableOpacity style={styles.mainButton} onPress={handleAuth}>
              <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.switchContainer} onPress={() => setIsLogin(!isLogin)}>
            <Text style={styles.switchText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.underline}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
            </Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>Only @chmsu.edu.ph emails are permitted. For demo purpose only</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f1f8e9' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, elevation: 6 },
  logo: { fontSize: 50, textAlign: 'center', marginBottom: 10 },
  title: { fontSize: 28, fontWeight: '800', color: '#2e7d32', textAlign: 'center', marginBottom: 20 },
  groupLabel: { fontSize: 14, fontWeight: '700', color: '#33691e', textAlign: 'center' },
  groupMembers: { fontSize: 14, color: '#2e7d32', textAlign: 'center', marginBottom: 25 },
  inputSection: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#33691e', marginBottom: 6 },
  input: { backgroundColor: '#f9fff9', borderWidth: 1, borderColor: '#d0e8d0', borderRadius: 10, padding: 12, fontSize: 16 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9fff9', borderWidth: 1, borderColor: '#d0e8d0', borderRadius: 10 },
  passwordInput: { flex: 1, padding: 12, fontSize: 16 },
  eyeIcon: { padding: 12 },
  mainButton: { backgroundColor: '#4caf50', padding: 14, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  switchContainer: { marginTop: 20, alignItems: 'center' },
  switchText: { fontSize: 15, color: '#666', textAlign: 'center' },
  underline: { color: '#2e7d32', fontWeight: '700', textDecorationLine: 'underline' },
  footerText: { textAlign: 'center', color: '#9e9e9e', fontSize: 12, marginTop: 30 },
});