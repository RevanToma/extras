import FavContextProvider from '@/context/favorite-context';
import { Stack } from 'expo-router';

export default function StackLayout() {
  return (
    <FavContextProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#351401' },
          headerTintColor: '#fff',
          contentStyle: { backgroundColor: '#3f2f25' },
          headerBackTitle: 'Back',
        }}
      >
        <Stack.Screen
          name='(drawer)'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </FavContextProvider>
  );
}
