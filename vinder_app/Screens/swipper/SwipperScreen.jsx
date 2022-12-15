import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import SwipeableCard from './SwipeableCard';
import MatchScreen from './MatchScreen';

const SwipperScreen = () => {
  // get all profile that can i like
  const [noMoreCard, setNoMoreCard] = useState(false);
  // set all profile to sampleCardArray
  const [sampleCardArray, setSampleCardArray] = useState(DEMO_CONTENT);
  const [swipeDirection, setSwipeDirection] = useState('');
  const [match, setNewMatch] = useState(false)
  let lastSwipDirection = "";
  const [lastItemSwiped,setLastItemSwiped] = useState();
  const removeCard = (profile) => {
    setLastItemSwiped(profile);

    sampleCardArray.splice(
    sampleCardArray.findIndex((item) => item.id == profile.id),1);
    setSampleCardArray(sampleCardArray);
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
    if (lastSwipDirection==="Right"){
      //check if it's a match between the 2 person if yes insert new match
      setNewMatch(true)      
      insertNewMatch(profile.id)
    }else {
      // insert in dislike table
    }
  };

  const lastSwipedDirection = (swip) => {
    setSwipeDirection(swip);
    lastSwipDirection=swip;
  };
  const insertNewMatch = (userId) => {

  }

  return (     
    <View style={{flex:1}}>
        <View style={styles.container}>
        {match?
          <MatchScreen profile={lastItemSwiped} liked={() => setNewMatch(false)} />
        :""}
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={() => removeCard(item)}
            swipedDirection={lastSwipedDirection}
          />
        ))}
      {noMoreCard?
      <Text>
        Plus aucune personne disponible autour de vous
      </Text>
      :""}
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    paddingLeft:8,
    paddingRight:8,
    paddingBottom:20,

},
});

const DEMO_CONTENT = [
  {
    id: '1',
    cardTitle: 'Card 1',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      }
      ,
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      }
    ],
    localisation:"belgique"
  },
  {
    id: '2',
    cardTitle: 'Card 2',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Belgique"

  },
  {
    id: '3',
    cardTitle: 'Card 3',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Congo"
  },
  {
    id: '4',
    cardTitle: 'Card 4',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ], localisation:"France"
  },
  {
    id: '5',
    cardTitle: 'Card 5',
    images:[
      {
        uri:require("../../images/quidam.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],    localisation:"belgique"
  },
  {
    id: '6',
    cardTitle: 'Card 1',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      }
      ,
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      }
    ],
    localisation:"belgique"
  },
  {
    id: '7',
    cardTitle: 'Card 2',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Belgique"

  },
  {
    id: '8',
    cardTitle: 'Card 3',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Congo"
  },
  {
    id: '9',
    cardTitle: 'Card 4',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ], localisation:"France"
  },
  {
    id: '10',
    cardTitle: 'Card 5',
    images:[
      {
        uri:require("../../images/quidam.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],    localisation:"belgique"
  },
  {
    id: '11',
    cardTitle: 'Card 1',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      }
      ,
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      }
    ],
    localisation:"belgique"
  },
  {
    id: '12',
    cardTitle: 'Card 2',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Belgique"

  },
  {
    id: '13',
    cardTitle: 'Card 3',
    images:[
      {
        uri:require("../../images/women.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],
    localisation:"Congo"
  },
  {
    id: '14',
    cardTitle: 'Card 4',
    images:[
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ], localisation:"France"
  },
  {
    id: '15',
    cardTitle: 'Card 5',
    images:[
      {
        uri:require("../../images/quidam.jpg")
      },
      {
        uri:require("../../images/random_aze.png")
      },
      {
        uri:require("../../images/women.jpg")
      }
    ],    localisation:"belgique"
  },
].reverse();

export default SwipperScreen;