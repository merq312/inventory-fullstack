import { useCallback, useReducer } from 'react';
import { MenuItem } from '../features/InventoryInfo/types';
import { PostItem } from '../features/InventoryInput/types';

const initialState: Array<PostItem> = [];

type Action =
  | { type: 'add_items'; items: Array<MenuItem> }
  | {
      type: 'modify_item';
      name: string;
      value: number;
      session: keyof PostItem['counts'];
    };

const reducer = (state: Array<PostItem>, action: Action) => {
  switch (action.type) {
    case 'modify_item': {
      return state.map((ea: PostItem) => {
        if (ea.name === action.name) {
          return {
            name: ea.name,
            counts: { ...ea.counts, [action.session]: action.value },
          };
        }
        return { ...ea };
      });
    }
    case 'add_items': {
      return action.items.map((item) => {
        return {
          name: item.name,
          counts: {
            overnightCount: item.overnightCount,
            morningCount: item.morningCount,
            afternoonCount: item.afternoonCount,
            leftoverCountOne: item.leftoverCountOne,
            leftoverCountTwo: item.leftoverCountTwo,
          },
        };
      });
    }
    default:
      return [...state];
  }
};

const usePost = () => {
  const [post, setPost] = useReducer(reducer, initialState);
  const addItemsAction = useCallback(
    (items: Array<MenuItem>) => setPost({ type: 'add_items', items: items }),
    [setPost]
  );

  const modifyItemAction = useCallback(
    (name: string, value: number, session: string) =>
      setPost({
        type: 'modify_item',
        name: name,
        value: value,
        session: session as keyof PostItem['counts'],
      }),
    [setPost]
  );

  return { post, addItemsAction, modifyItemAction };
};

export default usePost;
