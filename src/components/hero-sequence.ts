// Permet aux autres animations de la page d'attendre la fin de celles du hero.
//
// - NewHero appelle startHeroSequence() quand sa séquence desktop démarre,
//   puis endHeroSequence() quand elle se termine (ou si le hero disparaît).
// - Les autres composants passent leur animation à onHeroSequenceEnd() :
//   elle est lancée tout de suite si aucune séquence n'est en cours
//   (mobile, autre page…), sinon à la fin de celle du hero.

type Listener = (waited: boolean) => void;

let playing = false;
// Animations en attente de la fin du hero
const waiting = new Set<Listener>();
// Animations à lancer au prochain micro-tick (fin du hero en cours de traitement)
const scheduled = new Set<Listener>();

export function startHeroSequence() {
  playing = true;
}

export function endHeroSequence() {
  if (!playing) return;
  playing = false;

  waiting.forEach((listener) => scheduled.add(listener));
  waiting.clear();

  // Lancement différé : si la fin vient d'un changement de page, les
  // composants qui disparaissent ont ainsi le temps de se désabonner
  // avant qu'on anime leurs éléments (sinon ils seraient déjà null).
  queueMicrotask(() => {
    const toRun = [...scheduled];
    scheduled.clear();
    toRun.forEach((listener) => listener(true));
  });
}

export function isHeroSequencePlaying() {
  return playing;
}

/**
 * Lance `listener` à la fin de la séquence du hero (ou tout de suite s'il n'y
 * en a pas). `waited` vaut true si l'animation a dû attendre le hero.
 * Renvoie une fonction pour se désabonner (à appeler au démontage).
 */
export function onHeroSequenceEnd(listener: Listener) {
  if (!playing) {
    listener(false);
    return () => {};
  }
  waiting.add(listener);
  return () => {
    waiting.delete(listener);
    scheduled.delete(listener);
  };
}
