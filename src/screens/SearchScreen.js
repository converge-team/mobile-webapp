import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';

import service from '../_services/services';

import SecondaryTopBar from '../_components/SecondaryTopBar';
import ChatBox from '../_components/ChatBox';


function SearchScreen({ persons }) {

    console.log('persons: ', persons)

    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const [searching, setSearching] = useState(false);
    const [found, setFound] = useState([]);

    const handleChange = (e) => {
        setSearchValue(e.target.value);
        setSearching(true)
    }

    const handleKeyUp = (e) => {
        const caught = e.target.value;

        setTimeout(() => {
            if (caught === inputRef.current.value) {
                if (searchValue.length !== 0) {
                    service.message.search(searchValue)
                        .then(data => {
                            setFound(data.result);
                        })
                        .catch(error => {
                            console.warn(error);
                        })
                }
            }
        }, 500)
    }

    const checkState = (person) => {
        const inAppState = persons.find(personInState => (
            personInState._id === person._id
        )); // Check if person is in app's state 

        if(!inAppState || inAppState.unconfirmed) { // if person is not in app's state or the user hasn't sent a message (unconfirmed)
            return true                             // then return true to add ?new=true to link
        } else {
            return false
        }
    }

    return (
        <div className="search-screen">
            <SecondaryTopBar
                main={
                    <input ref={inputRef} onChange={handleChange} onKeyUp={handleKeyUp} type="text" className="search-input" placeholder="Type to search..." />
                }
                back="home"
            />
            <div className="chat_boxes_cover">
                {
                    found.map(person => (
                        <ChatBox
                            new={() => checkState(person)}
                            img_src="https://cdn.pixabay.com/photo/2017/01/18/17/14/girl-1990347_960_720.jpg"
                            key={person._id}
                            name={`${person.first_name} ${person.last_name}`}
                            id={person._id}
                            lastMessage=''
                        />
                    ))
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        persons: state.messages.persons
    }
}

const connectedSearchScreen = connect(mapStateToProps, null)(SearchScreen)

export default connectedSearchScreen;