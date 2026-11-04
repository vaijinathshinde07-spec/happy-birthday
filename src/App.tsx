/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GalaxyCanvas } from './components/GalaxyCanvas';
import { OpeningScene } from './components/OpeningScene';
import { Navbar } from './components/Navbar';
import { BirthdayHero } from './components/BirthdayHero';
import { ConstellationOfSmiles } from './components/ConstellationOfSmiles';
import { GlowingLetter } from './components/GlowingLetter';
import { GardenOfHappiness } from './components/GardenOfHappiness';
import { WishRoom } from './components/WishRoom';
import { PressHoldWish } from './components/PressHoldWish';
import { SecretMessageCapsule } from './components/SecretMessageCapsule';
import { HappinessCorner } from './components/HappinessCorner';
import { TimeCapsule } from './components/TimeCapsule';
import { FinalSurprise } from './components/FinalSurprise';
import { BirthdayKeepsake } from './components/BirthdayKeepsake';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { CelestialCursor } from './components/CelestialCursor';
import { LuckyStarCatch } from './components/LuckyStarCatch';
import { HiddenUniverse } from './components/HiddenUniverse';
import { CosmicLoader } from './components/CosmicLoader';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    // Check if ?autostart=1 is present in URL for automated test runs or fast preview
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('autostart') === '1';
    }
    return false;
  });

  const [isWarping, setIsWarping] = useState<boolean>(false);

  const handleOpeningEnter = () => {
    setIsWarping(true);
    // After warp duration, switch view seamlessly
    setTimeout(() => {
      setHasEntered(true);
      setIsWarping(false);
    }, 850);
  };

  const scrollToWishRoom = () => {
    const el = document.getElementById('wish-room');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToConstellation = () => {
    const el = document.getElementById('constellation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070514] text-slate-100 overflow-x-hidden selection:bg-purple-500/30 selection:text-pink-200">
      {/* Dynamic Celestial Canvas Background */}
      <GalaxyCanvas
        isWarping={isWarping}
        speedMultiplier={hasEntered ? 0.7 : 1.2}
        interactive={true}
      />

      {/* Desktop subtle celestial stardust cursor trail */}
      <CelestialCursor />

      {/* Random Catch Your Lucky Star Interaction */}
      {hasEntered && <LuckyStarCatch />}

      {/* Secret Dimension Easter Egg Star */}
      {hasEntered && <HiddenUniverse />}

      {isLoading ? (
        /* Elegant Animated Galaxy Loading Screen */
        <CosmicLoader onComplete={() => setIsLoading(false)} />
      ) : !hasEntered ? (
        /* Cinematic Full-screen Opening Scene */
        <OpeningScene onEnter={handleOpeningEnter} />
      ) : (
        /* Main Experience */
        <div className="relative z-10 flex flex-col min-h-screen animate-in fade-in duration-1000">
          {/* Top Navigation */}
          <Navbar onWishClick={scrollToWishRoom} />

          <main className="flex-1 space-y-16 sm:space-y-24">
            {/* Section 1: Cinematic Birthday Hero */}
            <BirthdayHero
              onExploreClick={scrollToConstellation}
              onMakeWishClick={scrollToWishRoom}
            />

            {/* Section 2: The Constellation of Smiles */}
            <ConstellationOfSmiles />

            {/* Section 3: The Letter That Glows */}
            <GlowingLetter />

            {/* Section 4: A Garden of Happiness */}
            <GardenOfHappiness />

            {/* Section 5: The Magical Wish Room */}
            <WishRoom />

            {/* Section 6: Press & Hold Wishing Star */}
            <PressHoldWish />

            {/* Section 7: The Secret Message Capsule */}
            <SecretMessageCapsule />

            {/* Section 8: A Little Happiness Corner */}
            <HappinessCorner />

            {/* Section 9: The Time Capsule */}
            <TimeCapsule />

            {/* Section 10: The Final Galaxy Surprise */}
            <FinalSurprise />

            {/* Section 11: Digital Birthday Keepsake (Downloadable Card) */}
            <BirthdayKeepsake />
          </main>

          {/* Footer */}
          <Footer />

          {/* Floating Minimal Music Player */}
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}
