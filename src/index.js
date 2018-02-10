import 'aframe';
//import 'aframe-particle-system-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable} from 'mobx';


const data = observable({ color: "green" });


setInterval(()=>{
    data.color = Math.random()>.5?"red":"green";
},100);




const SceneComponent = observer(class extends React.Component {
    render() {
        return (
            <Scene>
                <Entity geometry={{primitive: 'box'}} material={{color: this.props.data.color}} position={{x: 0, y: 0, z: -5}}/>
                <Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>
            </Scene>
        );
    }
});



ReactDOM.render(<SceneComponent data={data}/>, document.querySelector('#root'));