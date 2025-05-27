import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: '#fff',
          drawerContentStyle: { backgroundColor: '#351401' },
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#351401',
          drawerActiveBackgroundColor: '#e4baa1',
        }}
      >
        <Drawer.Screen
          name='index'
          options={{
            drawerLabel: 'All Categories',
            title: 'All Categories',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='list' color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name='favourites'
          options={{
            drawerLabel: 'Favourites',
            title: 'Your Favourites',
            drawerIcon: ({ color, size }) => (
              <Ionicons name='star' color={color} size={size} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
