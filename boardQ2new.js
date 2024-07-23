[[jsxgraph input-ref-ansA='ansAref' input-ref-ansB='ansBref'  width="800px" height="800px"]]
JXG.Options.text.cssDefaultStyle += ';direction:ltr;'
JXG.Options.text.fontSize = 16;
JXG.Options.axis.highlight = false;

var board = JXG.JSXGraph.initBoard(divid, { showInfobox: true,showCopyright:false,showNavigation:false,axis:true, pan: {enabled:true},defaultAxes: {
    x: {
     name: 'זמן (דקות)',
      withLabel: true,
      label: {
        	position: 'rt',
		fontSize: 18,
          	offset: [-60, -30]
             },
      ticks: {
        label: {
          visible: true,
          anchorX: 'middle',
          anchorY: 'top',
          fontSize: 18,
          offset: [0, -3]
        },
        drawZero: false,
        visible: 'inherit'
      }
    },
    y: {
      name: '(M) ריכוז מולרי',
      withLabel: true,
label: {
	position: 'rt',
	fontSize: 18,
        rotate:90,
        offset: [-40, -100],
        display: 'internal',
      },
      ticks: {
        label: {
          visible:true,
          anchorX: 'right',
          anchorY: 'middle',
          fontSize: 18,
          offset: [-6, 0]
        },
        tickEndings: [1, 0],
        drawZero: false,
        visible: true   
      }
    }
  } });


board.highlightInfobox = function(x, y , el) {
		this.infobox.setText('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+y + 'M' );
};

var p1 = [], p2=[],p3=[],p4=[],p5=[],col = 'red'; 
var x1={#x1#},x2={#x2#},fixed={#fixed#};
var answered=false;

var mmin=Math.min(x1[0],x1[1],x2[0],x2[1]);
var mmax=Math.max(x1[0],x1[1],x2[0],x2[1]);

var xmin=-0.1*mmax;
var crvcol=['green','blue','orange','magenta'];
//randomize colors
crvcol.sort(function(a, b){return 0.5 - Math.random()}); 

board.setBoundingBox([-0.5,1.2*mmax,5.5,xmin]);
board.fullUpdate();

if (fixed==1) {x2[1]=x2[0]} else {x1[1]=x1[0]};


p1.push(board.create('point',[4.0,x1[1]],{infoboxDigits:4,strokeColor:crvcol[0],fillColor:crvcol[0],name:'[{#LblA#}]', 
     label:{color:crvcol[0],autoPosition: true, offset:[0, -20]},fixed:function(){return (fixed==1)||(answered)}})); 
p1.push(board.create('point',[3.5,function(){return p1[0].Y()}],{visible:false}));
p1.push(board.create('point',[3,function(){return p1[0].Y()}],{visible:false})); 
p1.push(board.create('point',[0.5,function(){return p1[0].Y()}],{visible:false})); 
p1.push(board.create('point',[0,x1[0]],{infoboxDigits:3,strokeColor:crvcol[0],fillColor:crvcol[0],name:'[{#LblA#}]', 
      label:{color:crvcol[0],autoPosition: true, offset:[10, 10]},fixed:true})); 


p2.push(board.create('point',[4.0,x2[1]],{infoboxDigits:4,strokeColor:crvcol[1],fillColor:crvcol[1],name:'[{#LblB#}]', 
         label:{color:crvcol[1],autoPosition: true, offset:[0, -20]},fixed:function(){return (fixed==2)||(answered)}})); 
p2.push(board.create('point',[3.5,function(){return p2[0].Y()}],{visible:false}));
p2.push(board.create('point',[3,function(){return p2[0].Y()}],{visible:false})); 
p2.push(board.create('point',[0.5,function(){return p2[0].Y()}],{visible:false})); 
p2.push(board.create('point',[0,x2[0]],{infoboxDigits:3,strokeColor:crvcol[1],fillColor:crvcol[1],name:'[{#LblB#}]', 
         label:{color:crvcol[1],autoPosition: true, offset:[10, 10]},fixed:true})); 


board.on('move',function(){ 
			  p1[0].moveTo([4,p1[0].Y()]);
			  p2[0].moveTo([4,p2[0].Y()]);
		
													});


var c=[];
c[0] = board.create('curve', JXG.Math.Numerics.bspline(p1,4), 
               {strokecolor:function(){if (fixed==1) {return 'black'} else {return crvcol[0]}}, strokeOpacity:0.6, strokeWidth:2}); 
c[1] = board.create('curve', JXG.Math.Numerics.bspline(p2,4), 
             {strokecolor:function(){if (fixed==2) {return 'black'} else {return crvcol[1]}}, strokeOpacity:0.6, strokeWidth:2}); 
 
var markA='',markB='';
var nameTA=board.create('text',[4.5,function(){return p1[0].Y()},function(){return markA}]),
    nameTB=board.create('text',[4.5,function(){return p2[0].Y()},function(){return markB}]);

   
board.fullUpdate(); 
stack_jxg.bind_point(ansAref,p1[0]);
stack_jxg.bind_point(ansBref,p2[0]);

board.fullUpdate();

p1[0].setPosition(JXG.COORDS_BY_USER,[4.1,p1[0].Y()]);board.update(); p1[0].setPosition(JXG.COORDS_BY_USER,[4,p1[0].Y()]);board.update();
p2[0].setPosition(JXG.COORDS_BY_USER,[4.1,p2[0].Y()]);board.update(); p2[0].setPosition(JXG.COORDS_BY_USER,[4,p2[0].Y()]);board.update();

var correct='<span style="font-size: 1.5em; color:green;">✔</span>',
    incorrect='<span style="font-size: 1.5em; color:red;">❌ </span>'

var checkAnswer = function(indx, mrk) {
  switch (indx) {
    case 1:
      if (mrk == 1) {
        markA = correct;
      } else {
        markA = incorrect ;
      }
      answered=true;
      board.update();
      break;
    case 2:
      if (mrk == 1) {
        markB = correct;
      } else {
       markB= incorrect;
      }
      answered=true;
      board.update();
  }
};

stack_js.get_content({#rqm#}).then((content) => {
if (content !== null) {
// As the content is not null this means the span is present so feedback is displayed and we can react to it here
if  (!answered ) 
{
var M=JSON.parse(content);
console.log(M);	
checkAnswer(M[0],M[1]);
}}});
[[/jsxgraph]]
