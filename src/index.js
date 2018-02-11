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


                <a-box position="-1 0.5 -3" rotation="0 45 0" color={this.props.data.color} shadow></a-box>
                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>
                <a-plane position="0 0 -4" rotation="-90 0 0" width="4" height="4" color="#7BC8A4" shadow></a-plane>
                <a-sky color="#ECECEC"></a-sky>


               {/* <a-entity hand-controls="left" aabb-collider="objects: .cube;" grab></a-entity>
                <a-entity hand-controls="right" aabb-collider="objects: .cube;" grab></a-entity>*/}



                {/*<Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>*/}
            </Scene>
        );
    }
});



ReactDOM.render(<SceneComponent data={data}/>, document.querySelector('#root'));