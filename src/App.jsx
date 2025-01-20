import React from 'react';
import GameContainer from './components/GameContainer';
import Header from './components/Header';

function App() {
  const user = {
    avatar: '',
    name: 'John Doe',
    rank: 15
  };

  return (
    <div>
      <Header userAvatar={user.avatar} userRank={user.rank} userName={user.name} />
      <main>
        <GameContainer picture={user.avatar}/>
      </main>
    </div>
  );
}

export default App;