import combinations from './helpers/combinations'
export default function manageGame(state = {
    p1_score: 0,
    p2_score: 0, 
    p3_score: 0, 
    p4_score: 0, 
    current_player: 1,
    current_turn: 1,
    keep_value: 0,
    rollable_dice: 6,
    kept_dice: [],
    rolled_dice: [],
    selected_value: 0,
    p1:"Player 1",
    p2:"Player 2",
    p3:"Player 3",
    p4:"Player 4",
    num_of_players: 2,
    isSubmitted: false,
    rollPhase: true,
    selected_dice:[],
    selection_array: [],
    rollThrown: false,
    fakle: false
    }, action) {
    switch (action.type) {

      case 'SUBMIT':
          const settings = { game: action.game };
          return {
            ...state,
            p1: settings.game.p1, 
            p2: settings.game.p2,
            p3: settings.game.p3,
            p4: settings.game.p4,
            num_of_players: settings.game.num_of_players,
            isSubmitted: true
            }

      case 'ROLL':
          const rolled_dice_holder = Array.from({length: state.rollable_dice}, () => Math.floor(Math.random() * 6) + 1)
          if (rolled_dice_holder.sort)
          return {
            ...state,
            rolled_dice: rolled_dice_holder,
            rollPhase: false, 
            rollThrown: true
            };
            
      case 'SELECT':
        const index_values = state.selection_array.indexOf(state.rolled_dice[action.value-1])
        const clone_of_value_array = [state.selection_array]
        clone_of_value_array.splice(index_values, 1)
  

        const index_ids = state.selected_dice.indexOf(action.value)
        const clone_of_selected_array = [state.selected_dice]
        clone_of_selected_array.splice(index_ids, 1)
        const includes_check = state.selected_dice.includes(action.value)

      
        const currentValue = [...state.selection_array, state.rolled_dice[action.value - 1]]

            console.log(currentValue.sort().join(', '))
          if (includes_check === true)
            return {
              ...state, 
              selected_dice: clone_of_selected_array, 
              selection_array: clone_of_value_array, 
              selected_value: combinations[clone_of_selected_array.join(', ').sort()]}
          else  return {
            ...state, 
            selected_value: combinations[currentValue.sort().join(', ')], 
            selected_dice: [...state.selected_dice, action.value], 
            selection_array: [...state.selection_array, 
            state.rolled_dice[action.value - 1]]}
          
        

        case 'KEEP':
          const kept_dice_clone = state.kept_dice.concat(state.selection_array)
          console.log(state.selected_dice.length)
          return{
            ...state, 
            keep_value: state.selected_value + state.keep_value, 
            kept_dice: kept_dice_clone, 
            rollable_dice: state.rollable_dice - state.selected_dice.length, 
            rollPhase: true, 
            selected_value: 0,
            selected_dice: [],
            selection_array: [],
            rollThrown: false};

        case 'END':
          const playerNum = state.current_player + 1
          if(playerNum > state.num_of_players)
            playerNum = 1

          const scoreHolder = [0, 0, 0, 0]
          if (state.current_player === 1) scoreHolder[0] = state.p1_score + state.keep_value 
          else if (state.current_player === 2) scoreHolder[1] = state.p2_score + state.keep_value
          else if (state.current_player === 3) scoreHolder[2] = state.p2_score + state.keep_value
          else scoreHolder[3] = state.p2_score + state.keep_value
          return{
            ...state,
            rollPhase: false,
            rollThrown: false,
            current_player: playerNum,
            current_turn: state.current_turn + 1,
            keep_value: 0,
            rollable_dice: 6,
            kept_dice: [],
            rolled_dice: [],
            selected_value: 0,
            selected_dice:[],
            selection_array: [],
            p1_score: scoreHolder[0],
            p2_score: scoreHolder[1], 
            p3_score: scoreHolder[2], 
            p4_score: scoreHolder[3], 
          };

        default:
          return state;
    
      }
    }