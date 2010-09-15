/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.2.0PR1
build: nightly
*/
YUI.add("transition-timer",function(B){var A=B.Transition;B.mix(A.prototype,{_start:function(){if(A.useNative){this._runNative();}else{this._runTimer();}},_runTimer:function(){var C=this;C._initAttrs();A._running[B.stamp(C)]=C;C._startTime=new Date();A._startTimer();},_endTimer:function(){var C=this;delete A._running[B.stamp(C)];C._startTime=null;},_runFrame:function(){var C=new Date()-this._startTime;this._runAttrs(C);},_runAttrs:function(G){var J=this,H=J._node,N=B.stamp(H),Q=A._nodeAttrs[N],F=A.behaviors,K=false,D=false,C,E,I,P,M,O,R,L;for(C in Q){E=Q[C];if((E&&E.transition===J)){O=E.duration;M=E.delay;P=(G-M)/1000;R=G;I=(L in F&&"set" in F[L])?F[L].set:A.DEFAULT_SETTER;K=(R>=O);if(R>O){R=O;}if(!M||G>=M){I(J,C,E.from,E.to,R-M,O-M,E.easing,E.unit);if(K){delete Q[C];J._count--;H.fire("transition:propertyEnd",{type:"propertyEnd",propertyName:C,config:J._config,elapsedTime:P});if(!D&&J._count<=0){D=true;J._end(P);J._endTimer();}}}}}},_initAttrs:function(){var J=this,E=A.behaviors,L=B.stamp(J._node),Q=A._nodeAttrs[L],D,I,K,N,G,C,M,O,P,F,H;for(C in Q){D=Q[C];if(Q.hasOwnProperty(C)&&(D&&D.transition===J)){I=D.duration*1000;K=D.delay*1000;N=D.easing;G=D.value;if(C in J._node._node.style||C in B.DOM.CUSTOM_STYLES){F=(C in E&&"get" in E[C])?E[C].get(J,C):A.DEFAULT_GETTER(J,C);O=A.RE_UNITS.exec(F);M=A.RE_UNITS.exec(G);F=O?O[1]:F;H=M?M[1]:G;P=M?M[2]:O?O[2]:"";if(!P&&A.RE_DEFAULT_UNIT.test(C)){P=A.DEFAULT_UNIT;}if(typeof N==="string"){if(N.indexOf("cubic-bezier")>-1){N=N.substring(13,N.length-1).split(",");}else{if(A.easings[N]){N=A.easings[N];}}}D.from=Number(F);D.to=Number(H);D.unit=P;D.easing=N;D.duration=I+K;D.delay=K;}else{delete Q[C];J._count--;}}}},destroy:function(){this.detachAll();this._node=null;}},true);B.mix(B.Transition,{_runtimeAttrs:{},RE_DEFAULT_UNIT:/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i,DEFAULT_UNIT:"px",intervalTime:20,behaviors:{left:{get:function(D,C){return B.DOM._getAttrOffset(D._node._node,C);}}},DEFAULT_SETTER:function(F,G,I,J,L,E,H,K){I=Number(I);J=Number(J);var D=F._node,C=A.cubicBezier(H,L/E);C=I+C[0]*(J-I);if(G in D._node.style||G in B.DOM.CUSTOM_STYLES){K=K||"";D.setStyle(G,C+K);}else{if(D._node.attributes[G]){D.setAttribute(G,C);}else{D.set(G,C);}}},DEFAULT_GETTER:function(E,C){var D=E._node,F="";if(C in D._node.style||C in B.DOM.CUSTOM_STYLES){F=D.getComputedStyle(C);}else{if(D._node.attributes[C]){F=D.getAttribute(C);}else{F=D.get(C);}}return F;},_startTimer:function(){if(!A._timer){A._timer=setInterval(A._runFrame,A.intervalTime);}},_stopTimer:function(){clearInterval(A._timer);A._timer=null;},_runFrame:function(){var C=true,D;for(D in A._running){if(A._running[D]._runFrame){C=false;A._running[D]._runFrame();}}if(C){A._stopTimer();}},cubicBezier:function(X,S){var b=0,L=0,a=X[0],K=X[1],Z=X[2],J=X[3],Y=1,I=0,W=Y-3*Z+3*a-b,V=3*Z-6*a+3*b,U=3*a-3*b,T=b,R=I-3*J+3*K-L,Q=3*J-6*K+3*L,P=3*K-3*L,O=L,N=(((W*S)+V)*S+U)*S+T,M=(((R*S)+Q)*S+P)*S+O;return[N,M];},easings:{ease:[0.25,0,1,0.25],linear:[0,0,1,1],"ease-in":[0.42,0,1,1],"ease-out":[0,0,0.58,1],"ease-in-out":[0.42,0,0.58,1]},_running:{},_timer:null,RE_UNITS:/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/},true);A.behaviors.top=A.behaviors.bottom=A.behaviors.right=A.behaviors.left;B.Transition=A;},"3.2.0PR1",{requires:["transition-native","node-style"]});