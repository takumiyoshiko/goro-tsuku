const BOS = 'BOS'
const UNK = 'UNK'
const BEAM_SIZE = 300
const CHUNK_SIZE = 5
const N_SHOWN = 5

class State {
  constructor(nums, words, yomis, rest, nlls) {
    this.nums = nums
    this.words = words
    this.yomis = yomis
    this.rest = rest
    this.nlls = nlls
  }

  getLastWord() {
    return this.words.length > 0 ? this.words[this.words.length - 1] : BOS
  }

  getNll() {
    return this.nlls.reduce((a, b) => {
      return a + b
    }, 0)
  }

  getAverageNll() {
    return (
      this.nlls.reduce((a, b) => {
        return a + b
      }, 0) / this.nlls.length
    )
  }

  getMaxNll() {
    return this.nlls.reduce((a, b) => {
      return Math.max(a, b)
    }, 0)
  }

  hasRest() {
    return this.rest !== ''
  }

  toString() {
    return `${this.words
      .map((word) => word.split('_')[0])
      .join('')}（${this.yomis.join('')}）`
  }
}

/**
 * Compare states.
 * @param {State} a
 * @param {State} b
 * @returns {number}
 */
const compareStates = (a, b) => {
  if (a.getNll() < b.getNll()) {
    return -1
  }
  if (a.getNll() < b.getNll()) {
    return 1
  }
  if (a.rest.length < b.rest.length) {
    return -1
  }
  if (a.rest.length < b.rest.length) {
    return 1
  }
  return 0
}

/**
 * Return true if the given state is valid.
 * @param {State} s
 * @returns {boolean}
 */
const isValidState = (s) => {
  if (s.words.length === 0) {
    return true
  }
  // Invalid if the first word is a particle
  const pos = s.words[0].split('_')[2]
  if (pos === '助詞') {
    return false
  }
  return true
}

/**
 * Get a set of next states.
 * @param {State} state
 * @param {Object.<string, Object.<string, string[]>>} dic
 * @param {Object.<string, Object.<string, number>>} lm
 * @returns {State[]}
 */
const getNextStates = (state, dic, lm) => {
  if (!state.hasRest()) {
    return [state]
  }
  let nextStates = []
  for (
    let chunkSize = 1;
    chunkSize <= Math.min(CHUNK_SIZE, state.rest.length);
    chunkSize++
  ) {
    const num = state.rest.slice(0, chunkSize)
    let word_yomi_pairs = []
    if (dic.hasOwnProperty(num)) {
      const yomiWordsMap = dic[num]
      for (const [yomi, words] of Object.entries(yomiWordsMap)) {
        words.forEach((word) => {
          word_yomi_pairs.push([word, yomi])
        })
      }
    }
    word_yomi_pairs.forEach(([word, yomi]) => {
      const lastWord = state.getLastWord()
      if (lm.hasOwnProperty(lastWord)) {
        const ll = lm[lastWord].hasOwnProperty(word) ? lm[lastWord][word] : lm[lastWord][UNK]
        const nextState = new State(
          state.nums.concat([num]),
          state.words.concat([word]),
          state.yomis.concat([yomi]),
          state.rest.slice(chunkSize),
          state.nlls.concat(-ll)
        )
        if (isValidState(nextState)) {
          nextStates.push(nextState)
        }
      }
    })
  }
  return nextStates
}

/**
 * Get a set of goros for the given number.
 * @param {string} num
 * @param {Object.<string, Object.<string, string[]>>} dic
 * @param {Object.<string, Object.<string, number>>} lm
 * @returns {State[]}
 */
export const getGoros = (num, dic, lm) => {
  let states = [new State([], [], [], num, [])]
  while (states.some((state) => state.hasRest())) {
    let nextStates = []
    states.forEach((state) => {
      nextStates = nextStates.concat(getNextStates(state, dic, lm))
    })
    nextStates.sort(compareStates)
    states = nextStates.slice(0, BEAM_SIZE)
  }
  let ret = []
  let used = []
  for (let i = 0; i < states.length; i++) {
    const state = states[i]
    if (!used.includes(state.toString())) {
      ret.push(state)
      used.push(state.toString())
    }
    if (ret.length === N_SHOWN) {
      return ret
    }
  }
  return ret
}
