var scene = new THREE.Scene();
function game()
{
    var ruchP = false;
    var ruchT = false;
    var ruchL = false;
    var ruchR = false;
    var radius = 700;
    var siz = 10;
    var box_tbl = [];
    var pox_tbl = [];
    var geometry = new THREE.PlaneBufferGeometry(4096, 4096, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000FF, side: THREE.DoubleSide, wireframe: true });
    var plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    scene.add(plane);
    var wallG = new THREE.CubeGeometry(32, 32, 32, 1, 1, 1);
    var wallGG = new THREE.CubeGeometry(128, 128, 128, 1, 1, 1);
    var wallM = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('./img/wall.jpg'), side: THREE.DoubleSide
    });
    function distanceVector(v1, v2) {
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;

        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    function createBox(obj, radius) {
        var v1 = new THREE.Vector3(obj.position.x,obj.position.y,obj.position.z);
        for (var ji = 0; ji < box_tbl.length; ji++) {
            scene.remove(box_tbl[ji]);         
        }
        for (var ji = 0; ji < pox_tbl.length; ji++) {
            scene.remove(pox_tbl[ji]);
        }      
        box_tbl = [];
        pox_tbl = [];
        vX = obj.position.x;
        vZ = obj.position.z;
        var podlogaG = new THREE.PlaneBufferGeometry(128, 128, 1, 1);
        var wallM2 = new THREE.MeshBasicMaterial({
            color: 0x00000//map: THREE.ImageUtils.loadTexture('./img/bark.jpg'), side: THREE.DoubleSide
        });
        var podlogaM = new THREE.MeshBasicMaterial({
            color: 0xffff00//map: THREE.ImageUtils.loadTexture('./img/floor.jpg')
            , side: THREE.DoubleSide
        });/*
        var podlogaMM = new THREE.MeshBasicMaterial({
            color: 0xff0000//map: THREE.ImageUtils.loadTexture('./img/floor.jpg')
            , side: THREE.DoubleSide
        });*/
        var wallM3 = new THREE.Mesh(wallG, wallM2);
        var podlogaM3 = new THREE.Mesh(podlogaG, podlogaM);
        //var podlogaMM3 = new THREE.Mesh(podlogaG, podlogaMM);
        
        
        for (var i = -5; i < 6; i++) {
            for (var j = -5; j < 6; j++) {
                var box = wallM3.clone();;
                box.position.y = 10;
                box.position.x = parseInt(obj.position.x / 256) * 256 + (j * 128);
                box.position.z = parseInt(obj.position.z / 256) * 256 + (i * 128);
                //if(j%2 == 0)
                    var podloga = podlogaM3.clone();
                //else
                //    var podloga = podlogaMM3.clone();
                podloga.position.y = 0;
                podloga.position.x = parseInt(obj.position.x / 256) * 256 + (j * 128);
                podloga.position.z = parseInt(obj.position.z / 256) * 256 + (i * 128);
                podloga.rotateX(Math.PI / 2);
                var v2 = new THREE.Vector3(box.position.x, box.position.y, box.position.z)
                    if (distanceVector(v1, v2) < radius) {
                        scene.add(box);
                        box_tbl.push(box);
                        scene.add(podloga);
                        pox_tbl.push(podloga);
                    }
            }
        }
    }
    var hel = new THREE.Mesh(wallGG, wallM);
    hel.position.y = siz*16;
    hel.position.x = siz*32;
    hel.position.z = siz*32;
    scene.add(hel);   
    var camera = new THREE.PerspectiveCamera(
            45, // k¹t patrzenia kamery (FOV - field of view)
            window.innerWidth / window.innerHeight, // proporcje widoku, powinny odpowiadaæ proporjom naszego ekranu przegl¹darki
            0.1, // minimalna renderowana odleg³oœæ
            10000 // maxymalna renderowana odleg³oœæ
        );
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x008000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    document.getElementsByTagName("body")[0].appendChild(renderer.domElement);
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 38:
                ruchP = true;
                break;
            case 40:
                ruchT = true;
                break;
            case 37:
                ruchL = true;
                break;
            case 39:
                ruchR = true;
                break;
        }
        console.log(ruchL, ruchP, ruchR, ruchT)
    }
    document.onkeyup = function (event) {
        switch (event.keyCode) {
            case 38:
                ruchP = false;
                break;
            case 40:
                ruchT = false;
                break;
            case 37:
                ruchL = false;
                break;
            case 39:
                ruchR = false;
                break;
        }
    }
    function animateScene()
    {
        renderer.render(scene, camera);
        requestAnimationFrame(animateScene);
        if (ruchP)
            hel.translateX(-8)
        if (ruchT) 
            hel.translateX(8)
        if (ruchL)
        {
            hel.rotation.y += Math.PI / 72;
        }
        if (ruchR)
        {
            hel.rotation.y -= Math.PI / 72;
        }
        
        var camVect = new THREE.Vector3(760 * 2, 400, 0);

        var camPos = camVect.applyMatrix4(hel.matrixWorld);
        camera.position.x = camPos.x;
        camera.position.y = camPos.y;
        camera.position.z = camPos.z;
        camera.lookAt(hel.position);
        createBox(hel, radius);
    }
    animateScene();
    
    //var axisHelper = new THREE.AxisHelper(1000);
    //scene.add(axisHelper);
}
window.onload = function () {
    game();
}