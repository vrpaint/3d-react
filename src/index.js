import 'aframe';
//import 'aframe-particle-system-component';
//import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable} from 'mobx';


const data = observable({ color: "green" });


setInterval(()=>{
    data.color = Math.random()>.5?"red":"green";
},100);


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomPosition() {
    function getRandomAxis() {
        return((Math.random()-.5)*100);
    }

    return `${getRandomAxis()} 0.5 ${getRandomAxis()}`;
}


const meshes = [];
for(let i=0;i<100;i++){
    meshes.push(
        <a-box position={getRandomPosition()} rotation="0 45 0" color={getRandomColor()} shadow key={i}></a-box>
    )
}



const SceneComponent = observer(class extends React.Component {
    render() {
        return (
            <a-scene vr-mode-ui="enabled: true" stats style={{position: 'absolute', height: '100%', width: '100%'}}>


                <a-box position="-1 0.5 -3" rotation="0 45 0" color={this.props.data.color} shadow></a-box>
                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
                <a-plane position="0 0 0" rotation="-90 0 0" width="200" height="200" color="#7BC8A4" shadow></a-plane>
                <a-sky color="#8EEAEC"></a-sky>


                <a-entity hand-controls="left" aabb-collider="objects: .cube;" grab></a-entity>
                <a-entity hand-controls="right" aabb-collider="objects: .cube;" grab></a-entity>






                {meshes}




                {/*<Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>*/}
            </a-scene>
        );
    }
});



ReactDOM.render(<SceneComponent data={data}/>, document.querySelector('#root'));