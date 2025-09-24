/**
 * @file src/components/easter-egg.tsx
 * @description A fun, interactive "game" component based on the Schrödinger's Cat thought experiment.
 *              It allows the user to "collapse the wave function" after completing a mini-game.
 *              The game features adaptive difficulty and cinematic results.
 * @note This is a client component due to its use of state (`useState`) and effects (`useEffect`).
 */
"use client"

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Box, Cat, Ghost, Timer, X, Atom, Dna, Biohazard, FlaskConical, PartyPopper, Skull, Star, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';
import { Progress } from '@/components/ui/progress';
import { setPet, PetType } from '@/lib/pet-state';
import { usePostHog } from 'posthog-js/react';
import { TOUR_STORAGE_KEY } from './guided-tour';

// Defines the possible states of the game.
type GameState = 'idle' | 'instructions' | 'playing' | 'revealing' | 'result' | 'failed';

// Icons used for the clickable "anomalies" in the game.
const ANOMALY_ICONS = [Atom, Dna, Biohazard, FlaskConical];
// Colors used for the anomalies, ensuring a vibrant and varied game board.
const ANOMALY_COLORS = ['#ff00ff', '#00ffff', '#ffb700', '#00ff00', '#ff5252', '#ad52ff', '#f472b6', '#3b82f6'];

interface Anomaly {
  id: string;
  x: number;
  y: number;
  Icon: React.ElementType;
  color: string;
}

interface ParticleEffect {
  id: number;
  x: number;
  y: number;
  type: ParticleType;
}

// Defines the icons used for different particle effects.
export const PARTICLE_ICONS = {
  popper: PartyPopper,
  ghost: Skull,
  revealing: Star,
  anomaly: Star,
};

// Defines the color palettes for different particle effects.
export const PARTICLE_COLORS = {
  popper: ['#facc15', '#fb923c', '#f87171', '#4ade80', '#22d3ee', '#a78bfa', '#f472b6', '#818cf8'],
  ghost: ['#a5f3fc', '#67e8f9', '#c4b5fd', '#a78bfa', '#f0abfc', '#bae6fd'],
  revealing: ['#ffffff', '#f0f0f0', '#e0e0e0'],
  anomaly: ANOMALY_COLORS,
};

export type ParticleType = keyof typeof PARTICLE_COLORS;

/** A single particle that animates flying outwards from a central point. */
const Particle = ({ type }: { type: ParticleType }) => {
  const duration = 0.6 + Math.random() * 0.8;
  const travelDistance = 150;
  
  const tx = (Math.random() - 0.5) * travelDistance;
  const ty = (Math.random() - 0.5) * travelDistance;
  const color = PARTICLE_COLORS[type][Math.floor(Math.random() * PARTICLE_COLORS[type].length)];
  const Icon = PARTICLE_ICONS[type];

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `50%`,
    top: `50%`,
    animation: `fly-out ${duration}s ease-out forwards`,
    opacity: 0,
    transform: `rotate(${Math.random() * 360}deg) scale(${0.5 + Math.random()})`,
    animationDelay: `${Math.random() * 0.1}s`,
    color: color,
    '--tx': `${tx}px`,
    '--ty': `${ty}px`,
  } as React.CSSProperties;

  return <div style={style}><Icon className="w-5 h-5" /></div>;
};


/** A container that generates a burst of particles of a specific type. */
export const FunParticles = ({ type, count }: { type: ParticleType, count: number }) => (
    <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: count }).map((_, i) => <Particle key={i} type={type} />)}
    </div>
);

/** The clickable "anomaly" component. */
const QuantumAnomaly = ({ anomaly, onClick }: { anomaly: Anomaly, onClick: (id: string, x: number, y: number) => void }) => (
  <button
    onClick={() => onClick(anomaly.id, anomaly.x, anomaly.y)}
    className="absolute w-12 h-12 rounded-full flex items-center justify-center animate-orb-pop-in transition-transform duration-200 hover:scale-110"
    style={{ left: `${anomaly.x}%`, top: `${anomaly.y}%`, color: anomaly.color, backgroundColor: `${anomaly.color}20` }}
  >
    <anomaly.Icon className="w-8 h-8" />
  </button>
);

// Simplified game settings. No more levels or difficulty scaling.
const GAME_SETTINGS = {
  time: 15, // 15 seconds
  anomalies: 5, // 5 anomalies to click
  spawnRate: 800, // Spawn a new anomaly every 800ms
};

/**
 * Main component for the "Quantum Conundrum" game.
 * Manages game state, logic, and UI rendering for the interactive easter egg.
 */
export default function EasterEgg() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [catState, setCatState] = useState<PetType | null>(null);
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  const [particleEffects, setParticleEffects] = useState<ParticleEffect[]>([]);
  const [isResultIconVisible, setIsResultIconVisible] = useState(true);
  const posthog = usePostHog();
  
  const [anomaliesToClick, setAnomaliesToClick] = useState(GAME_SETTINGS.anomalies);
  const [timeLeft, setTimeLeft] = useState(GAME_SETTINGS.time);

  const ref = useRef<HTMLDivElement>(null);
  const resultIconRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const anomalySpawnerRef = useRef<NodeJS.Timeout | null>(null);
  const isVisible = useInView(ref);

  const isGameActive = gameState !== 'idle';

  /** Clears all active game timers. */
  const cleanupTimers = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (anomalySpawnerRef.current) clearInterval(anomalySpawnerRef.current);
  };
  
  /** Central function to end the game and update its state. */
  const endGame = useCallback((finalState: 'failed' | 'result') => {
      cleanupTimers();
      setGameState(finalState);
      const gameCompletedEvent = new CustomEvent('gameCompleted', { detail: { state: finalState } });
      window.dispatchEvent(gameCompletedEvent);
  }, []);
  
  /** Function to spawn a new anomaly at a random position. */
  const spawnAnomaly = useCallback(() => {
    setAnomalies(prevAnomalies => {
      // Limit on-screen anomalies to prevent clutter.
      if (prevAnomalies.length >= 7) {
        return prevAnomalies;
      }
      const newAnomaly: Anomaly = {
        id: `${Date.now()}-${Math.random()}`, // Unique ID for React key
        x: 5 + Math.random() * 85,
        y: 5 + Math.random() * 85,
        Icon: ANOMALY_ICONS[Math.floor(Math.random() * ANOMALY_ICONS.length)],
        color: ANOMALY_COLORS[Math.floor(Math.random() * ANOMALY_COLORS.length)],
      };
      return [...prevAnomalies, newAnomaly];
    });
  }, []);

  /** Starts the main game loop: timer and anomaly spawning. */
  const beginGame = () => {
    // Reset all game state variables
    setAnomaliesToClick(GAME_SETTINGS.anomalies);
    setTimeLeft(GAME_SETTINGS.time);
    setAnomalies([]);
    setParticleEffects([]);

    // Start the game logic
    setGameState('playing');
    
    // Start the countdown timer.
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          posthog.capture('game_lost', { game_time_left: 0 });
          endGame('failed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Start the anomaly spawner.
    anomalySpawnerRef.current = setInterval(spawnAnomaly, GAME_SETTINGS.spawnRate);
    spawnAnomaly(); // Spawn the first one immediately.
  }

  /** Shows instructions, then starts the game after a short delay. */
  const showInstructionsAndStart = () => {
    posthog.capture('game_started');
    setPet(null); // Clear any existing global pet
    setGameState('instructions');

    setTimeout(() => {
        beginGame();
    }, 2500); // Show instructions for 2.5 seconds.
  };

  /** Handles the click event on a quantum anomaly. */
  const handleAnomalyClick = (id: string, x: number, y: number) => {
    setAnomalies(prev => prev.filter(a => a.id !== id));
    
    // Create a particle burst at the anomaly's location for visual feedback.
    const newEffect: ParticleEffect = { id: Date.now(), x, y, type: 'anomaly' };
    setParticleEffects(prev => [...prev, newEffect]);
    setTimeout(() => {
      setParticleEffects(prev => prev.filter(p => p.id !== newEffect.id));
    }, 2000);

    setAnomaliesToClick(prev => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        posthog.capture('game_won', { game_time_left: timeLeft });
        observe(); // All anomalies collected, trigger the win sequence.
        return 0;
      }
      // Spawn a new one immediately after a click to keep the pace up.
      spawnAnomaly(); 
      return newCount;
    });
  };

  /** Triggers the "wave function collapse" animation and determines the game's outcome. */
  const observe = () => {
    cleanupTimers();
    setGameState('revealing');
    setTimeout(() => {
      // The probability of the cat being alive is 1/3.
      const result: PetType = Math.random() < (1 / 3) ? 'alive' : 'ghost';
      
      posthog.capture('pet_spawned', { pet_type: result });
      
      setCatState(result);
      setIsResultIconVisible(true); // Ensure icon is visible before animation.
      endGame('result');
      // Delay setting the pet to create the illusion of it "coming from" the card.
      setTimeout(() => {
        if (resultIconRef.current) {
          const rect = resultIconRef.current.getBoundingClientRect();
          setPet(result, rect.left + rect.width / 2, rect.top + rect.height / 2);
          setIsResultIconVisible(false); // Hide the icon as the pet spawns.
        }
      }, 250);
    }, 2500); // 2.5 second reveal animation.
  };

  /** Resets the game to its initial state. */
  const reset = () => {
    cleanupTimers();
    setGameState('idle');
    setCatState(null);
    setAnomalies([]);
    setParticleEffects([]);
    setAnomaliesToClick(GAME_SETTINGS.anomalies);
  };
  
  /** A developer utility to reset all progress, including the guided tour. */
  const factoryReset = () => {
    try {
      localStorage.removeItem(TOUR_STORAGE_KEY);
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to reset state in localStorage", error);
    }
  }

  // Cleanup timers on component unmount.
  useEffect(() => {
    return cleanupTimers;
  }, []);

  return (
    <>
      {isGameActive && (
        <div 
          className="fixed inset-0 z-40"
          onClick={reset}
        ></div>
      )}
      <section
        id="quantum-conundrum-section" 
        ref={ref}
        className={cn(
          "space-y-4 text-center transition-opacity duration-1000 ease-out", 
          isVisible ? "opacity-100" : "opacity-0",
           // When game is active, it becomes a fixed overlay for modal behavior.
           isGameActive && "fixed inset-0 w-full h-full flex items-center justify-center z-50 p-4"
        )}
        style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}
      >
          <Card className={cn(
              "group relative border-border/40 shadow-lg transition-all duration-700 ease-out text-center overflow-hidden w-full",
              isVisible && !isGameActive ? "opacity-100 translate-y-0 bg-card/30" : !isGameActive ? "opacity-0 translate-y-5" : "",
              // Use a solid background when the game is active for better visibility.
              isGameActive ? "max-w-3xl h-auto md:h-[550px] flex flex-col bg-background" : "max-w-full"
          )}
          style={{ transitionDelay: isVisible ? `200ms` : '0ms' }}
          >
              {gameState === 'idle' && <div className="animate-border-glow"></div>}

              {isGameActive && (
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 z-20" onClick={reset}>
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close Game</span>
                </Button>
              )}
              <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2 text-primary">
                      <Box className="h-8 w-8" />
                      A Quantum Conundrum
                  </CardTitle>
                  <CardDescription className="max-w-prose mx-auto italic">
                    An interactive thought experiment. Your observation collapses the wave function.
                  </CardDescription>
              </CardHeader>
              <CardContent className={cn("min-h-[300px] flex flex-col items-center justify-center space-y-6 p-6", isGameActive && "flex-grow")}>
                  
                  {gameState === 'idle' && (
                      <div className="space-y-6 animate-fade-in w-full max-w-sm px-4">
                          <blockquote className='space-y-2'>
                            <p className="font-medium text-foreground/90">My fate is in superposition. Click the button to observe the outcome.</p>
                          </blockquote>
                           <div className="text-sm text-foreground/80">
                             <p>This is a simple game of chance and speed.</p>
                             <p>A roaming pet awaits the result!</p>
                           </div>
                          <div className="w-full pt-4">
                            <Button id="begin-experiment-button" onClick={showInstructionsAndStart} size="lg" className="w-full sm:w-auto animate-tour-glow">
                              Begin Game
                            </Button>
                          </div>
                      </div>
                  )}

                  {gameState === 'instructions' && (
                     <div className="space-y-4 animate-fade-in text-center relative w-full h-full flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-primary">Get Ready!</h3>
                        <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                          <div className="relative w-12 h-12 rounded-full flex items-center justify-center" style={{ color: ANOMALY_COLORS[0], backgroundColor: `${ANOMALY_COLORS[0]}20`}}>
                             <Atom className="w-8 h-8" />
                          </div>
                          <p className="text-foreground/80 text-lg">Tap anomalies like this before time runs out!</p>
                        </div>
                        <Progress value={100} className="w-1/2" />
                    </div>
                  )}
                  
                  {(gameState === 'playing' || gameState === 'failed') && (
                      <div className="space-y-4 animate-fade-in w-full h-full flex flex-col">
                          <h3 className="font-bold text-lg text-primary">{gameState === 'failed' ? 'Experiment Failed!' : 'Tap the Anomalies!'}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm font-medium">
                                {/* The anomaly counter */}
                                <span className={cn(
                                    "flex items-center gap-2",
                                    anomaliesToClick > 0 ? "text-amber-500" : "text-green-500"
                                )}>
                                    {anomaliesToClick > 0 ? (
                                        <>
                                         <Atom className="h-4 w-4 animate-spin" style={{ animationDuration: '3s' }} />
                                         {anomaliesToClick} Anomalies Remaining
                                        </>
                                    ) : (
                                        <>
                                         <CheckCircle2 className="h-4 w-4" />
                                         Objective Complete!
                                        </>
                                    )}
                                </span>
                                <span className="flex items-center gap-1 text-red-500"><Timer className="h-4 w-4" />{Math.round(timeLeft)}s</span>
                             </div>
                          </div>
                          <div 
                            className="relative w-full flex-grow bg-primary/5 border border-primary/20 rounded-lg mt-2 min-h-[250px] md:min-h-[350px] touch-none"
                          >
                            {/* The "Failed" state UI */}
                            {gameState === 'failed' && (
                                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center">
                                  <div className="grid grid-cols-3 gap-8">
                                    <Skull className="h-16 w-16 text-destructive/50" />
                                    <Skull className="h-16 w-16 text-destructive/50" />
                                    <Skull className="h-16 w-16 text-destructive/50" />
                                  </div>
                                   <Button onClick={reset} size="lg" variant="destructive">Reset Experiment</Button>
                                </div>
                              )}
                              {/* The main game board where anomalies appear */}
                              {gameState === 'playing' && anomalies.map(item => (
                                <QuantumAnomaly key={item.id} anomaly={item} onClick={handleAnomalyClick} />
                              ))}
                              {/* Container for particle effects on anomaly click */}
                              {particleEffects.map(effect => (
                                <div key={effect.id} className="absolute" style={{left: `${effect.x}%`, top: `${effect.y}%`, width: '50px', height: '50px', transform: 'translate(-50%, -50%)'}}>
                                   <FunParticles type={effect.type} count={15} />
                                </div>
                               ))}
                          </div>
                           <p className="text-xs text-foreground/80 pt-2 flex items-center justify-center gap-2">
                            {gameState === 'failed' ? 'The quantum state destabilized. The timeline has been purged.' : `Collect ${GAME_SETTINGS.anomalies} anomalies in ${Math.round(GAME_SETTINGS.time)} seconds!`}
                          </p>
                      </div>
                  )}

                  {gameState === 'revealing' && (
                      <div className="space-y-4 animate-fade-in text-center relative w-full h-full flex flex-col items-center justify-center">
                          <FunParticles type="revealing" count={200} />
                          <h3 className="text-xl font-bold text-primary">Wave Function Collapsing...</h3>
                          <p className="text-foreground/80">Determining final state...</p>
                          <Progress value={100} className="w-1/2" />
                      </div>
                  )}

                  {gameState === 'result' && (
                       <div className="w-full animate-fade-in space-y-6">
                          <div className="relative flex flex-col items-center justify-center gap-4">
                              {catState === 'alive' && (
                                  <div className="relative flex-1 p-4 border border-green-500/30 bg-green-500/10 rounded-lg space-y-3 text-center w-full max-w-sm">
                                      <FunParticles type="popper" count={100} />
                                      <h3 className="font-bold text-green-500">Observation Complete!</h3>
                                      <div ref={resultIconRef} className={cn("transition-opacity duration-300", !isResultIconVisible && "opacity-0")}>
                                        <Cat className="h-16 w-16 mx-auto text-green-500 animate-popper" />
                                      </div>
                                      <p className="text-xl font-bold text-green-500">The cat is ALIVE!</p>
                                      <p className="text-sm text-foreground/80">The superposition collapsed into a definite state of life. A pet now follows you!</p>
                                  </div>
                              )}
                              {catState === 'ghost' && (
                                  <div className="relative flex-1 p-4 border border-sky-400/30 bg-sky-400/10 rounded-lg space-y-3 text-center w-full max-w-sm">
                                      <FunParticles type="ghost" count={50} />
                                      <h3 className="font-bold text-destructive">You Monster.</h3>
                                      <div ref={resultIconRef} className={cn("transition-opacity duration-300", !isResultIconVisible && "opacity-0")}>
                                        <Ghost className="h-16 w-16 mx-auto text-sky-400 animate-ghost" />
                                      </div>
                                      <p className="text-xl font-bold text-sky-400">The cat has decohered.</p>
                                      <p className="text-sm text-foreground/80">A vengeful spirit now haunts this page. Are you happy now?</p>
                                  </div>
                              )}
                          </div>
                          <p className='text-xs text-foreground/60 max-w-prose mx-auto pt-4'>
                            By participating, you didn't just see a result—you created it. This is the essence of the observer effect in quantum mechanics.
                          </p>
                          <Button onClick={reset} variant="outline">Run New Experiment</Button>
                      </div>
                  )}
              </CardContent>
              {/* Developer/Testing tools */}
              <div className="absolute bottom-1 right-1">
                <Button 
                  onClick={factoryReset} 
                  className="text-muted-foreground/50 hover:text-muted-foreground/90 transition-colors text-xs p-2 h-auto rounded-md hover:bg-muted/50"
                  variant="ghost"
                  title="Reset all game statistics and restart the guided tour."
                >
                  Dev Reset
                </Button>
              </div>
          </Card>
      </section>
    </>
  );
}
