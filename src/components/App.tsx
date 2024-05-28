import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from '../queryClient';
import PokemonList from './PokemonList';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonList />
    </QueryClientProvider>
  );
};

export default App;
