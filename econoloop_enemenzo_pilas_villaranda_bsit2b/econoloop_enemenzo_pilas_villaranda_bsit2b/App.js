import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppDataProvider } from './contexts/AppDataContext';

// Import your screens
import HomeScreen from './components/screens/HomeScreen';
import GiveHelpScreen from './components/screens/GiveHelpScreen';
import TakeHelpScreen from './components/screens/TakeHelpScreen';
import CommunityScreen from './components/screens/CommunityScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import ChatScreen from './components/screens/ChatScreen';
import LoginScreen from './components/screens/LoginScreen';   // Create this if it doesn't exist

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: '#757575',
        tabBarStyle: { height: 70, paddingBottom: 8, paddingTop: 6 },
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarLabel: 'Eco-Feed',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Give" 
        component={GiveHelpScreen} 
        options={{
          tabBarLabel: 'Give Help',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="add-circle" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Take" 
        component={TakeHelpScreen} 
        options={{
          tabBarLabel: 'Take Help',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="search" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Community" 
        component={CommunityScreen} 
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="people" size={size} color={color} />,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="person" size={size} color={color} />,
        }} 
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Replace with a loading spinner later if you want
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AppDataProvider>
    </AuthProvider>
  );
}