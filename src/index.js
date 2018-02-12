import 'aframe';
import * as OIMO from 'oimo';
import * as THREE from 'three';
//import 'aframe-physics-components';
//import 'aframe-particle-system-component';
//import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';
import {observable} from 'mobx';


const world = new OIMO.World({
    timestep: 1/60,
    iterations: 8,
    broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
    worldscale: 1, // scale full world
    random: true,  // randomize sample
    info: false,   // calculate statistic or not
    gravity: [0,-9.8,0]
});


const groundBody = world.add({
    type:'box', // type of shape : sphere, box, cylinder
    size:[200,1,200], // size of shape
    pos:[0,-.5,0], // start position in degree
    rot:[0,0,0], // start rotation in degree
    move:false, // dynamic or statique
    density: 1,
    friction: 0.2,
    restitution: 0.2,
    belongsTo: 1, // The bits of the collision groups to which the shape belongs.
    collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
});



const data = observable({ color: "green",meshes:[] });



function addMesh(){

    const color = getRandomColor();
    const position = getRandomPosition();
    const rotation = getRandomRotation();


    const body = world.add({
        type:'box', // type of shape : sphere, box, cylinder
        size:[1,1,1], // size of shape
        pos:position, // start position in degree
        rot:rotation, // start rotation in degree
        move:true, // dynamic or statique
        density: 1,
        friction: 0.2,
        restitution: 0.2,
        belongsTo: 1, // The bits of the collision groups to which the shape belongs.
        collidesWith: 0xffffffff // The bits of the collision groups with which the shape collides.
    });

    const mesh = {
        color,
        position,
        rotation,
        body
    };

    console.log(mesh);

    data.meshes.push(mesh);

}

setInterval(addMesh,4000);

addMesh();






function physicsTick(){

    world.step();

    for(const mesh of data.meshes) {


        const position = mesh.body.getPosition();
        const quaternion = mesh.body.getQuaternion();
        const rotation = new THREE.Euler().setFromQuaternion( new THREE.Quaternion(quaternion.x,quaternion.y,quaternion.z,quaternion.w) );

        //console.log(mesh.body.getQuaternion(),rotation);

        mesh.position = [position.x,position.y,position.z];


        mesh.rotation = [
            rotation.x/Math.PI*180,
            rotation.y/Math.PI*180,
            rotation.z/Math.PI*180
        ];
        //myMesh.quaternion.copy( body.getQuaternion() );

    }

    requestAnimationFrame(physicsTick);
}
physicsTick();





/*setInterval(()=>{
    data.color = Math.random()>.5?"red":"green";
},100);*/


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomPosition(asArray=true) {
    function getRandomAxis() {
        return((Math.random()-.5)*10);
    }

    if(asArray){
        return [
            getRandomAxis(),
            (Math.random()*10),
            getRandomAxis(),
        ];
    }else{
        return `${getRandomAxis()} ${(Math.random()*10)} ${getRandomAxis()}`;
    }

}

function getRandomRotation(asArray=true) {
    function getRandomAxis() {
        return(Math.random()*360);
    }
    if(asArray){
        return [
            getRandomAxis(),
            getRandomAxis(),
            getRandomAxis(),
        ];
    }else{
        return `${getRandomAxis()} ${getRandomAxis()} ${getRandomAxis()}`;
    }

}




const SceneComponent = observer(class extends React.Component {
    render() {
        return (
            <a-scene vr-mode-ui="enabled: true"  stats style={{position: 'absolute', height: '100%', width: '100%'}}>


                <a-box position="-1 6 -3" rotation="0 45 0" color={this.props.data.color} shadow></a-box>
                <a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E" shadow></a-sphere>
                <a-cylinder position="1 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" shadow></a-cylinder>



                {/*<a-entity  physics-body="boundingBox: 100 1 100; mass: 0; velocity: 0 0 0" position="0 -.5 0" width="200" height="200"></a-entity>*/}
                <a-plane position="0 0 0" rotation="-90 0 0" width="200" height="200" color="#7BC8A4" shadow></a-plane>





                <a-sky color="#8EEAEC"></a-sky>


                <a-entity hand-controls="left" aabb-collider="objects: .cube;" grab></a-entity>
                <a-entity hand-controls="right" aabb-collider="objects: .cube;" grab></a-entity>




                {this.props.data.meshes.map((meshData,i)=>(

                    <a-box position={meshData.position.join(' ')} rotation={meshData.rotation.join(' ')} color={meshData.color} shadow key={i}></a-box>

                ))}




                {/*<Entity particle-system={{preset: 'snow'}}/>
                <Entity light={{type: 'point'}}/>
                <Entity gltf-model={{src: 'virtualcity.gltf'}}/>
                <Entity text={{value: 'Hello, WebVR!'}}/>*/}
            </a-scene>
        );
    }
});



ReactDOM.render(<SceneComponent data={data}/>, document.querySelector('#root'));