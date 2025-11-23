import React, { useState } from 'react';
import { 
  Clock, Users, User, ChevronDown, ChevronUp, Trophy, Dumbbell, 
  AlertCircle, ArrowDown, Flag, MapPin, Anchor, Zap, Footprints, 
  Repeat, ArrowRight, CircleDot, Timer, Search
} from 'lucide-react';

// --- COMPOSANT: SCHÉMA TACTIQUE (WOD MAP) ---
const WodVisualMap = ({ steps }) => {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="my-6 bg-slate-900/60 rounded-xl p-4 border border-slate-700/50 shadow-inner relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>
      
      <div className="relative z-10 flex flex-col items-center space-y-2">
        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Plan du WOD</span>
        
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center w-full relative group">
            {/* Connecting Line (except for last item) */}
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-8 bottom-[-8px] w-0.5 bg-gradient-to-b from-slate-600 to-slate-800 -z-10 h-full"></div>
            )}
            
            <div className="flex items-center w-full max-w-[280px]">
              {/* Icon Container */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10
                ${step.type === 'start' ? 'bg-emerald-900/80 border-emerald-500 text-emerald-400' : 
                  step.type === 'finish' ? 'bg-red-900/80 border-red-500 text-red-400' : 
                  step.type === 'zone' ? 'bg-indigo-900/80 border-indigo-500 text-indigo-400' :
                  'bg-slate-800 border-slate-600 text-slate-300'}
              `}>
                {step.icon || <CircleDot size={18} />}
              </div>

              {/* Text Detail */}
              <div className="ml-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-2 rounded-lg flex-grow shadow-sm">
                <span className="text-xs font-bold text-slate-200 block uppercase">{step.label}</span>
                {step.sub && <span className="text-[10px] text-slate-400 block">{step.sub}</span>}
              </div>
            </div>

            {/* Down Arrow between steps */}
            {index < steps.length - 1 && (
               <ArrowDown size={12} className="text-slate-600 my-1 animate-bounce opacity-50" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPOSANT: CARTE WOD ---
const WodCard = ({ wod }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(wod.variants ? Object.keys(wod.variants)[0] : 'Standard');

  const isTeam = wod.category === 'TEAM';
  
  // Data resolution
  const currentData = wod.variants ? wod.variants[selectedVariant] : wod.defaultData;
  const variantKeys = wod.variants ? Object.keys(wod.variants) : [];
  
  // Use map from variant if specific, else generic wod map
  const mapToRender = currentData.visualMap || wod.visualMap;
  
  // Use flow from variant if specific, else generic wod flow
  const flowText = currentData.flow || wod.flow;

  return (
    <div className="group relative bg-slate-800/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-slate-700/50 flex flex-col h-full hover:border-slate-500/50 transition-all duration-300">
      
      {/* Decorative Gradient Blob */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 pointer-events-none ${isTeam ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>

      {/* Header */}
      <div className={`p-5 relative ${isTeam ? 'border-b border-indigo-500/20' : 'border-b border-emerald-500/20'}`}>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded shadow-sm tracking-wider uppercase ${isTeam ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'}`}>
                {wod.category}
              </span>
              <span className="text-slate-400 text-xs font-mono font-bold tracking-tight opacity-70">{wod.id}</span>
            </div>
            <h3 className="text-2xl font-black text-white leading-tight tracking-tight drop-shadow-sm">{wod.title}</h3>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center text-orange-400 font-bold bg-orange-950/30 border border-orange-500/30 px-3 py-1 rounded-lg">
              <Clock size={16} className="mr-1.5" />
              <span className="text-sm">{wod.timeCap}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection Tabs */}
      {variantKeys.length > 0 && (
        <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-slate-700/30 bg-slate-800/30">
          {variantKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedVariant(key)}
              className={`px-3 py-1 text-[10px] font-bold uppercase rounded-lg transition-all duration-200 border ${
                selectedVariant === key
                  ? (isTeam 
                      ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.2)]' 
                      : 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]')
                  : 'bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="p-5 flex-grow relative z-10">
        
        {/* Movements List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
             <h4 className="text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
               Workout
             </h4>
             {currentData.load && (
               <span className="text-xs font-bold text-yellow-400 border border-yellow-400/30 bg-yellow-400/10 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(250,204,21,0.1)]">
                 {currentData.load}
               </span>
             )}
          </div>
          
          <ul className="space-y-3">
            {currentData.movements.map((move, idx) => (
              <li key={idx} className="flex items-start group/item">
                <span className={`mt-1 mr-3 w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300 ${isTeam ? 'bg-indigo-500 group-hover/item:bg-indigo-400' : 'bg-emerald-500 group-hover/item:bg-emerald-400'}`}></span>
                <span className="text-slate-200 font-medium text-sm leading-snug">{move}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- THE SCHEMA (VISUAL MAP) --- */}
        <WodVisualMap steps={mapToRender} />

        {/* Notes Box */}
        {currentData.notes && (
          <div className="mt-4 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20 flex items-start gap-3">
            <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-200/80 leading-relaxed font-medium">
              {currentData.notes}
            </p>
          </div>
        )}
      </div>

      {/* Footer / Toggle */}
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="w-full bg-slate-900/30 hover:bg-slate-800/50 border-t border-slate-700/30 p-3 flex items-center justify-center text-slate-400 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
      >
        {showDetails ? (
          <>Masquer le Flow <ChevronUp size={14} className="ml-2" /></>
        ) : (
          <>Détails du Flow <ChevronDown size={14} className="ml-2" /></>
        )}
      </button>
      
      {showDetails && (
        <div className="bg-slate-900/80 p-5 text-sm text-slate-300 border-t border-slate-700/50 animate-in slide-in-from-top-2 duration-200">
          <h5 className="text-[10px] uppercase text-slate-500 font-bold mb-3 border-b border-slate-700 pb-1">
            Flow & Standards (Officiel)
          </h5>
          <p className="whitespace-pre-line leading-relaxed opacity-90 text-xs md:text-sm font-light text-slate-200">
            {flowText}
          </p>
        </div>
      )}
    </div>
  );
};

// --- DATA DEFINITION ---
const App = () => {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Icons for maps
  const ICONS = {
    start: <MapPin size={18} />,
    finish: <Flag size={18} />,
    row: <Anchor size={18} />,
    gym: <Zap size={18} />,
    ski: <ArrowDown size={18} />,
    run: <Footprints size={18} />,
    lift: <Dumbbell size={18} />,
    box: <ArrowUpBlock />,
    repeat: <Repeat size={18} />
  };

  function ArrowUpBlock() { return <div className="w-4 h-4 bg-current rounded-sm" /> }

  const wods = [
    // --- INDIVIDUEL ---
    {
      id: "EVENT 1",
      category: "INDIV",
      title: "5K ROW",
      timeCap: "25 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.row, sub: 'Sur le Rameur' },
        { type: 'zone', label: '5000m Row', icon: ICONS.row },
        { type: 'zone', label: 'Sprint', icon: ICONS.run, sub: 'Vers le mat' },
        { type: 'finish', label: 'Arrivée', icon: ICONS.finish }
      ],
      defaultData: {
        movements: ["5000m Row"],
        notes: "Restez sur le rameur jusqu'à la validation des mètres."
      },
      flow: "Avant le départ, l'athlète se positionne sur son rameur assigné.\n\nAu signal 3, 2, 1, GO, l'athlète commence à ramer.\n\nIl effectue les 5000m. Une fois la distance validée à l'écran du rameur, il quitte immédiatement le rameur et sprinte jusqu'au mat d'arrivée.\n\nLe temps s'arrête lorsque l'athlète arrive au mat d'arrivée !"
    },
    {
      id: "EVENT 2",
      category: "INDIV",
      title: "Gym & Ski Chipper",
      timeCap: "9 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start, sub: 'Derrière le Rig' },
        { type: 'zone', label: 'Rig Zone', icon: ICONS.gym, sub: 'Muscle Ups' },
        { type: 'zone', label: 'Ski Zone', icon: ICONS.ski, sub: 'Calories' },
        { type: 'zone', label: 'HSW Zone', icon: ICONS.run, sub: 'Lignes de 10m/7.5m' },
        { type: 'finish', label: 'Arrivée', icon: ICONS.finish }
      ],
      variants: {
        "Homme": {
          movements: ["30 Ring Muscle Ups", "30 Cal SkiErg", "30m Handstand Walk"],
          notes: "HSW par segments de 10m Unbroken."
        },
        "Elite F": {
          movements: ["24 Ring Muscle Ups", "24 Cal SkiErg", "30m Handstand Walk"],
          notes: "HSW par segments de 10m Unbroken."
        },
        "Rx/Master F": {
          movements: ["24 Bar Muscle Ups", "24 Cal SkiErg", "30m Handstand Walk"],
          notes: "HSW par segments de 7.5m Unbroken."
        }
      },
      flow: "Avant le départ, l'athlète se positionne derrière le rig.\n\nAu signal 3, 2, 1, GO, il avance jusqu'aux anneaux et réalise ses 30 RMU (ou 24 selon catégorie). Une fois terminé, il se dirige vers le SkiErg et effectue 30 calories pour les hommes, 24 pour les femmes.\n\nIl avance ensuite vers la zone de HSW. Il se place derrière la première ligne et progresse en handstand par segment de 10m unbroken.\n\nUne fois les 30m complétés, il se relève et sprint jusqu'au mat d'arrivée.\n\nLe temps s'arrête lorsque l'athlète arrive au mat d'arrivée."
    },
    {
      id: "EVENT 3",
      category: "INDIV",
      title: "Max Lift Fat Bar",
      timeCap: "8 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'Lift Zone', icon: ICONS.lift, sub: 'Zone Délimitée' },
        { type: 'finish', label: 'Fin du Time', icon: <Timer size={18}/> }
      ],
      defaultData: {
        movements: ["1RM Clean & Jerk Fat Bar"],
        notes: "Restez dans votre zone. Déchargez la barre à la fin."
      },
      flow: "Avant le départ, l'athlète se positionne devant sa barre.\n\nAu signal 3, 2, 1, GO, il dispose de 8 minutes pour réaliser autant de tentatives qu'il le souhaite. Il doit rester dans sa zone délimitée pendant toute la durée de l'évent. Il peut modifier les charges entre les tentatives.\n\nLa répétition doit être valider dans le time!\n\nUne barre même attaquer avant le cap mais validé hors time sera une no rep!\n\nLes athlètes sont responsables de décharger leur barre en fin de wod."
    },
    {
      id: "EVENT 4",
      category: "INDIV",
      title: "5 Rounds Fire",
      timeCap: "12 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'DU Zone', icon: <Repeat size={18}/>, sub: '90 Double Unders' },
        { type: 'zone', label: 'Lift Zone', icon: ICONS.lift, sub: '12 Thrusters' },
        { type: 'finish', label: 'Répéter x5', icon: <Repeat size={18}/>, sub: 'Avancer la barre à chaque tour' }
      ],
      variants: {
        "Elite": {
          load: "60/40 kg",
          movements: ["5 Rounds of:", "90 Double Unders", "12 Thrusters"],
          notes: "Avancer la barre dans la zone suivante après chaque série."
        },
        "Autres": {
          load: "50/30 kg",
          movements: ["5 Rounds of:", "90 Double Unders", "12 Thrusters"],
          notes: "Avancer la barre dans la zone suivante après chaque série."
        }
      },
      flow: "Avant le départ, l'athlète se positionne sur son mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète se dirige dans sa zone de DU et réalise 90 double-unders.\n\nUne fois les 90 DU complétés, il rejoint la première zone de lift et réalise 12 thrusters. Une fois les 12 thrusters terminés, l'athlète repose sa barre puis l'avance dans la prochaine zone de lift, il retourne dans sa zone de DU pour le round suivant.\n\nCe cycle se répète 5 fois au total.\n\nÀ l'issue du 5e round, après avoir reposé sa barre, l'athlète sprinte jusqu'au mat d'arrivée. Le temps s'arrête lorsque l'athlète arrive au mat d'arrivée."
    },
    {
      id: "EVENT 5",
      category: "INDIV",
      title: "The Long Chipper",
      timeCap: "12 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'Corde', icon: ICONS.gym, sub: '6 Grimpés' },
        { type: 'zone', label: 'Box', icon: ICONS.box, sub: '24 BBJO' },
        { type: 'zone', label: 'KB Zone', icon: ICONS.lift, sub: '16 Snatch' },
        { type: 'zone', label: 'Fentes', icon: ICONS.run, sub: 'Farmer Carry A/R' },
        { type: 'zone', label: 'Retour', icon: <ArrowRight size={18}/>, sub: 'KB -> BBJO -> Rig (TTB)' },
        { type: 'finish', label: 'Arrivée', icon: ICONS.finish }
      ],
      variants: {
        "Elite H": {
          movements: ["6 Legless Rope Climb (Assis)", "24 BBJO", "16 Double KB Snatch", "Farmer Lunge (Aller-Retour)", "16 Double KB Snatch", "24 BBJO", "60 Toes to Bar"]
        },
        "Elite F": {
          movements: ["6 Legless Rope Climb (Debout)", "24 BBJO", "16 Double KB Snatch", "Farmer Lunge (Aller-Retour)", "16 Double KB Snatch", "24 BBJO", "60 Toes to Bar"]
        },
        "Rx/Master": {
          movements: ["6 Rope Climb (Classique)", "24 BBJO", "16 Double KB Snatch", "Farmer Lunge (Aller-Retour)", "16 Double KB Snatch", "24 BBJO", "60 Toes to Bar"]
        },
        "Teens": {
          movements: ["6 Rope Climb", "24 BBJO", "16 KB Snatch (1 KB)", "Farmer Lunge", "16 KB Snatch", "24 BBJO", "60 TTB"]
        }
      },
      flow: "Avant le départ, l'athlète se positionne sur son mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète se dirige vers sa corde et grimpe 6 fois (variation selon sa catégorie).\n\nAprès la 6e répétition validée, il avance et réalise 24 burpees box jump-overs. Une fois les 24 BBJO terminés, il se dirige vers les kettlebells et effectue 16 snatches à la double KB.\n\nIl part ensuite pour un aller-retour en farmer's lunges. Il effectue à nouveau 16 double KB snatches. Il retourne à la box pour 24 BBJO supplémentaires.\n\nEnfin, il se dirige vers la barre de pull-up et réalise 60 toes-to-bar. Une fois le 60e TTB validé, il sprinte jusqu'au mat d'arrivée. Le temps s'arrête lorsque l'athlète arrive au mat d'arrivée."
    },
    {
      id: "EVENT 6",
      category: "INDIV",
      title: "D-Ball & HSPU Ladder",
      timeCap: "7 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'D-Ball Zone', icon: <CircleDot size={18}/>, sub: 'Cleans' },
        { type: 'zone', label: 'Wall Zone', icon: ICONS.gym, sub: 'HSPU / Wall Walks' },
        { type: 'finish', label: 'Répéter x3', icon: <Repeat size={18}/>, sub: 'Avancer D-Ball à chaque tour' }
      ],
      variants: {
        "Elite": {
          movements: ["12 D-Ball / 12 Strict HSPU", "9 D-Ball / 9 (1WW + 1 Strict)", "6 D-Ball / 6 (1WW + 2 Strict)"]
        },
        "Autres": {
          movements: ["9 D-Ball / 9 Strict HSPU", "7 D-Ball / 7 (1WW + 1 Strict)", "5 D-Ball / 5 (1WW + 2 Strict)"]
        },
        "Master F": {
          movements: ["9 D-Ball / 9 Strict HSPU", "7 D-Ball / 7 Strict HSPU", "5 D-Ball / 5 Strict HSPU"],
          notes: "Pas de Wall Walk."
        }
      },
      flow: "Avant le départ, l'athlète se positionne sur son mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète se dirige vers son D-Ball et réalise 12 D-Ball cleans. Une fois les 12 cleans complétés, il avance le D-ball dans la prochaine zone, il se déplace ensuite vers le mur pour effectuer 12 strict HSPU.\n\nAprès les 12 SHSPU, Il retourne dans la zone de D-Ball et réalise 9 répétions, puis avance le D-Ball dans la prochaine zone. Il retourne au mur pour 9 complexes: 1 wall walk + 1 strict HSPU.\n\nAprès 9 complexes, il effectue 6 D-Ball cleans, puis retourne pour 6 complexes de 1 wall walk + 2 strict HSPU.\n\nAprès le dernier complexe, il sprint jusqu'au mat de départ. Le temps s'arrête lorsque l'athlète arrive au mat de départ"
    },

    // --- TEAM ---
    {
      id: "EVENT 1",
      category: "TEAM",
      title: "AMRAP You Go I Go",
      timeCap: "15 min",
      visualMap: [
        { type: 'start', label: 'Zone Départ', icon: ICONS.start, sub: 'Attente relais' },
        { type: 'zone', label: 'Box Zone', icon: ICONS.box, sub: '9 BJ Over' },
        { type: 'zone', label: 'KB Zone', icon: ICONS.lift, sub: '7 Snatch' },
        { type: 'zone', label: 'Wall Zone', icon: ICONS.gym, sub: '5 HSPU' },
        { type: 'finish', label: 'Relais', icon: <Repeat size={18}/>, sub: 'Retour tape main' }
      ],
      variants: {
        "Elite": {
          movements: ["9 High Box Jump Over (Step down oblig)", "7 Double KB Snatch", "5 Strict HSPU"],
          notes: "Rotation A -> B -> C complète."
        },
        "Inter": {
          movements: ["9 Box Jump Over", "7 Simple KB Snatch", "5 HSPU Kipping"],
          notes: "Rotation A -> B -> C complète."
        }
      },
      flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent sur leur mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète A se dirige vers la zone de la box. Il effectue 9 high box jump-overs Step down obligatoire, puis avance vers la zone de lift et réalise 7 double KB snatches, enfin il se dirige vers le mur et effectue 5 strict HSPU.\n\nUne fois les 5 SHSPU terminés, l'athlète A retourne au mat de départ et tape dans la main de l'athlète B qui prend le relais.\n\nB effectue le même cycle, puis passe à C.\nC effectue son cycle et repasse à A.\n\nL'équipe enchaîne ainsi pendant 15 minutes en rotation continue. Le score est le nombre total de rounds + reps complétés par l'équipe."
    },
    {
      id: "EVENT 2",
      category: "TEAM",
      title: "Row Relay",
      timeCap: "23 min",
      visualMap: [
        { type: 'start', label: 'Mat Départ', icon: ICONS.start, sub: 'Zone de Relais' },
        { type: 'zone', label: 'Run', icon: ICONS.run, sub: 'Transition' },
        { type: 'zone', label: 'Rameur', icon: ICONS.row, sub: 'Accumulation mètres' }
      ],
      variants: {
        "Hommes": {
          movements: ["6000m Row Total"],
          notes: "Relais libre, changement au mat."
        },
        "Femmes": {
          movements: ["5000m Row Total"],
          notes: "Relais libre, changement au mat."
        }
      },
      flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent au mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète A se dirige vers le rameur et commence à ramer. Les athlètes B et C restent au mat de départ.\n\nLorsque A souhaite un relai, il quitte le rameur et va jusqu'au mat de départ pour checker la main d'un de ses partenaires.\n\nLes 3 athlètes peuvent se relayer autant de fois qu'ils le souhaitent en suivant ce principe: l'athlète sur le rameur revient checker la main d'un partenaire au mat, qui part aussitôt ramer.\n\nLorsque que la distance est atteinte, les 3 athlète sprint jusqu'au mat d'arriver. Le temps s'arrête lorsque le dernier athlète arrive au mat d'arrivée."
    },
    {
      id: "EVENT 3",
      category: "TEAM",
      title: "Synchro Worm & Gym",
      timeCap: "12 min",
      visualMap: [
        { type: 'start', label: 'Rig', icon: ICONS.gym, sub: 'Synchro Pull/C2B/BMU' },
        { type: 'zone', label: 'Worm Zone', icon: <Users size={18}/>, sub: 'Clean & Jerk / Thrusters' },
        { type: 'zone', label: 'Burpees', icon: ICONS.run, sub: 'Over Worm' },
        { type: 'finish', label: 'Avancer', icon: <ArrowRight size={18}/>, sub: 'Progresser vers arrivée' }
      ],
      variants: {
        "Elite/Rx": {
          movements: ["90 Pull Ups (Sync 2)", "15 Worm C&J", "60 C2B (Sync 2)", "30 Burpees (Sync 3)", "30 BMU (Sync 2)", "15 Worm C&J"]
        },
        "Inter": {
          movements: ["90 Pull Ups", "15 Worm C&J", "60 C2B", "30 Burpees (Sync 3)", "30 BMU", "15 Worm C&J"],
          notes: "Pas de synchro au rig."
        }
      },
      flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent sur leur mat de départ.\n\nAu signal 3, 2, 1, GO, l'équipe se dirige vers le rig et effectue 90 pull-ups en synchro à 2.\n\nUne fois complétés, ils avancent vers le worm et réalisent 15 clean & jerks avant de le faire progresser dans la prochaine zone.\n\nL'équipe retourne ensuite au rig pour 60 chest-to-bar en synchro à 2, puis effectue 30 burpees over worm en synchro le worm vers la zone suivante.\n\nIls retournent au rig pour 30 bar muscle-ups en synchro à 2, puis rejoignent le worm pour 15 derniers clean & jerks 10 rep puis progression dans la zone d'après pour les 5 dernière rep.\n\nUne fois le 15e C/J validé, les 3 athlètes sprintent jusqu'au mat d'arrivée. Le temps s'arrête lorsque le dernier athlète franchit la ligne au mat d'arrivée."
    },
    {
      id: "EVENT 4",
      category: "TEAM",
      title: "Gym Relay & Worm",
      timeCap: "13 min",
      visualMap: [
        { type: 'start', label: 'Rig', icon: ICONS.gym, sub: 'TTB Synchro' },
        { type: 'zone', label: 'Worm', icon: <Users size={18}/>, sub: '20 Thrusters' },
        { type: 'zone', label: 'Gym Indiv', icon: ICONS.run, sub: 'HSW ou DU (Relais)' },
        { type: 'finish', label: 'Tour suivant', icon: <Repeat size={18}/>, sub: 'Retour au Rig' }
      ],
      variants: {
        "Elite": {
          movements: ["4 Rounds:", "30 T2B (Synchro 2)", "20 Worm Thrusters", "10m HSW chacun (5m UBK)"],
          flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent sur leur mat de départ.\n\nAu signal 3, 2, 1, GO, l'équipe se dirige vers le rig et effectue 30 toes-to-bar en synchro à 2.\n\nUne fois complétés, ils avancent vers le worm et réalisent 20 thrusters ensemble.\n\nAprès les 20 thrusters, chaque athlète effectue individuellement 10m de HSW (soit 30m au total pour l'équipe). Une fois les 3 athlète passer, l'équipe retourne au rig pour le round 2.\n\nCe cycle se répète 4 fois.\n\nÀ la fin du 4e round, les 3 athlètes sprintent jusqu'au mat d'arrivée. Le temps s'arrête lorsque le dernier athlète franchit la ligne au mat d'arrivée."
        },
        "Inter": {
          movements: ["4 Rounds:", "20 T2B (Synchro 2)", "20 Worm Thrusters", "Relais 100 DU (A-B-C-Partage)"],
          notes: "DU remplacent le HSW.",
          flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent sur leur mat de départ.\n\nAu signal 3, 2, 1, GO, l'équipe se dirige vers le rig et effectue 20 TTB en synchro à 2.\n\nUne fois complétés, l'équipe avance vers le worm et réalise 20 thrusters ensemble. Ensuite, l'athlète A effectue 100 DU dans sa zone.\n\nRound 2: l'équipe retourne au rig pour 20 TTB en synchro à 2, puis au worm pour 20 thrusters, avant que l'athlète B effectue 100 DU dans sa zone.\n\nRound 3: même enchaînement avec l'athlète C qui effectue les 100 DU dans sa zone.\n\nRound 4: après les 20 TTB et 20 thrusters, les 3 athlètes se répartissent 100 DU en relais (répartition libre).\n\nÀ la fin du dernier DU du round 4, les 3 athlètes sprintent jusqu'au mat d'arrivée. Le temps s'arrête lorsque le dernier athlète franchit la ligne au mat d'arrivée."
        }
      }
    },
    {
      id: "EVENT 5",
      category: "TEAM",
      title: "Ski & Lift Interval",
      timeCap: "9 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'Ski Erg', icon: ICONS.ski, sub: 'Athlète Solo' },
        { type: 'zone', label: 'Lift Zone', icon: ICONS.lift, sub: 'Duo Synchro (Max Rounds)' },
        { type: 'finish', label: 'Rotation', icon: <Repeat size={18}/>, sub: 'Toutes les 3 mins' }
      ],
      variants: {
        "Elite": {
          load: "60/40 kg",
          movements: ["Rotation 3 min:", "Solo: 20/15 Cal Ski", "Duo: 5 Lift + 5 STOH"]
        },
        "Inter": {
          load: "50/35 kg",
          movements: ["Rotation 3 min:", "Solo: 20/15 Cal Ski", "Duo: 5 Lift + 5 STOH"]
        }
      },
      flow: "Avant le départ, les 3 athlètes de l'équipe se positionnent sur leur mat de départ.\n\nAu signal 3, 2, 1, GO, l'athlète A se dirige vers le SkiErg pour 20 calories hommes ou 15 calories femmes. Une fois les calories valider, les athlètes B et C réalisent un maximum de tour de: 5 deadlifts suivis de 5 shoulder-to-overhead en synchro.\n\nÀ 3:00, le round 2 démarre: l'athlète B va au SkiErg pour réaliser son nombre de calorie. Une fois les calories valider, A et C effectuent un maximum de tour de: 5 hang cleans + 5 STOH synchro.\n\nÀ 6:00, le round 3 démarre: l'athlète C va au SkiErg pour réaliser son nombre de calorie Une fois les calories valider, A et B effectuent au maximum de tour de: 5 squats clean + 5 STOH en synchro."
    },
    {
      id: "EVENT 6",
      category: "TEAM",
      title: "Team Max Lift",
      timeCap: "12 min",
      visualMap: [
        { type: 'start', label: 'Départ', icon: ICONS.start },
        { type: 'zone', label: 'Lift Zone', icon: ICONS.lift, sub: '1 Barre Fat Bar' },
        { type: 'finish', label: 'Max Load', icon: <Trophy size={18}/>, sub: 'Cumul des 3 max' }
      ],
      defaultData: {
        movements: ["1RM Clean & Jerk Fat Bar (Chacun)"],
        notes: "Score = Total des 3 barres max."
      },
      flow: "L'équipe se positionne devant sa barre au signal, les 3 athlètes disposent de 12 minutes pour réaliser autant de tentatives qu'ils le souhaitent.\n\nL'équipe reste dans sa zone pendant toute la durée de l'évent. Ils peuvent modifier les charges entre les tentatives.\n\nLa répétition doit être valider dans le time! Une barre même attaquer avant le cap mais validé hors time sera une no rep !\n\nLes athlètes sont responsables de décharger leur barre en fin de wod."
    }
  ];

  const filteredWods = wods.filter(wod => {
    // 1. Filter by Category
    const matchesCategory = filter === 'ALL' || wod.category === filter;
    
    // 2. Filter by Search
    if (!searchQuery) return matchesCategory;

    const query = searchQuery.toLowerCase();
    
    // Check Title & ID
    const matchesText = wod.title.toLowerCase().includes(query) || 
                        wod.id.toLowerCase().includes(query);
    
    // Check Default Data Movements
    const matchesDefaultMovements = wod.defaultData?.movements?.some(m => m.toLowerCase().includes(query));

    // Check Variants Movements
    const matchesVariantMovements = wod.variants && Object.values(wod.variants).some(variant => 
      variant.movements?.some(m => m.toLowerCase().includes(query))
    );

    return matchesCategory && (matchesText || matchesDefaultMovements || matchesVariantMovements);
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-2 md:p-6 pb-20 selection:bg-emerald-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black -z-10"></div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-8 text-center pt-8">
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-4 tracking-tighter uppercase italic drop-shadow-2xl">
          WOD <span className="text-emerald-500">Visuals</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 font-medium">
          Tableau de bord interactif & Schémas tactiques
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6 relative px-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-7 flex items-center pointer-events-none z-10">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-4 py-3 bg-slate-900/60 border border-slate-700/50 rounded-full leading-5 placeholder-slate-500 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm shadow-xl"
              placeholder="Rechercher (ex: Snatch, Row...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="inline-flex bg-slate-900/80 p-1.5 rounded-full border border-slate-700/50 backdrop-blur-xl shadow-2xl">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-6 py-2.5 text-xs font-bold uppercase rounded-full transition-all duration-300 ${filter === 'ALL' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            Tout
          </button>
          <button 
            onClick={() => setFilter('INDIV')}
            className={`px-6 py-2.5 text-xs font-bold uppercase rounded-full transition-all duration-300 flex items-center ${filter === 'INDIV' ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <User size={14} className="mr-2" /> Indiv
          </button>
          <button 
            onClick={() => setFilter('TEAM')}
            className={`px-6 py-2.5 text-xs font-bold uppercase rounded-full transition-all duration-300 flex items-center ${filter === 'TEAM' ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
          >
            <Users size={14} className="mr-2" /> Team
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      {filteredWods.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {filteredWods.map((wod, index) => (
            <WodCard key={`${wod.category}-${wod.id}`} wod={wod} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-slate-500 text-lg">Aucun WOD trouvé pour "{searchQuery}"</p>
          <button onClick={() => setSearchQuery('')} className="mt-4 text-emerald-400 hover:underline">Effacer la recherche</button>
        </div>
      )}

      <div className="mt-16 text-center text-slate-600 text-[10px] uppercase tracking-widest">
        <p>Vérifiez toujours le briefing athlète pour les derniers ajustements.</p>
      </div>
    </div>
  );
};

export default App;
