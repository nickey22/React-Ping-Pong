import React from 'react';

class Ball extends React.Component{

    componentDidMount(){
        const Ball = document.querySelector("#Ball");
        const moveBall = setInterval(() => {
            this.ballMove(Ball); 
        },25);
    }

    ballMove(Ball){
        const { ballState } = this.props;
        
        let { left, top, direction, directionY} = ballState;
        const { moveSpeed, ballCollision, directionYSpeed } = ballState;

        const BallTop = Ball.offsetTop;
        const BallBottom = Ball.offsetTop + Ball.clientHeight;
        const BallMiddle = (BallTop + BallBottom) / 2;
       
        const { paddleState } = this.props; 

        //move left to right
        left = direction === "-" ?
                left - moveSpeed
            :
                left + moveSpeed

        //move up and down
        if(directionY !== "none"){
            top = directionY === "-" ?
                    top - directionYSpeed
                :
                    top + directionYSpeed
        }

        //check for player collision
        if(left <= paddleState.width){
            const PlayerPaddle = document.querySelector("#PlayerPaddle");
            const PaddleTop = PlayerPaddle.offsetTop;
            const PaddleBottom = PlayerPaddle.offsetTop + PlayerPaddle.clientHeight;
            const PaddleMiddle = (PaddleTop + PaddleBottom) / 2; 


            
            const BallPoints = [BallTop,BallMiddle,BallBottom];
            
            let CollidedWithPaddle = false;

            BallPoints.forEach(point=>{
                if(point >= PaddleTop && point <= PaddleBottom || point <= PaddleBottom && point >= PaddleTop){
                    CollidedWithPaddle = true;
                }
            })
            //collided with player
            if(CollidedWithPaddle){
                let newY;
                this.props.collidedWithPlayer();
                //check where it collided

                //direct middle collision
                if(BallMiddle === PaddleMiddle){
                    newY = "none";
                }
                BallPoints.forEach(point=>{
                    //collided somewhere on the top
                    if(point < PaddleMiddle && point > PaddleTop){
                        newY = "-";
                    }
                    //collided somewhere on the bottom
                    else if(point > PaddleMiddle && point < PaddleBottom){
                        newY = "+";
                    }
                })
                this.props.collidedWithPlayer(newY);
            }
            //did not collide
        }

        //check for wall collisions
        const GameBoard = document.querySelector("#GameBoard");
        const GameBoardTop = GameBoard.offsetTop;
        const GameBoardBottom = GameBoard.offsetTop + GameBoard.clientHeight;
        if(BallTop <= GameBoardTop || BallBottom >= GameBoardBottom){
            console.log("check Wall Collision")
            this.props.stopBall();
        }
        if(!ballCollision){
            this.props.updateBall(left,top)
        }
       
    }

    render(){
        const { ballState } = this.props;
        const BallStyle = {
            width: `${ballState.width}px`,
            height: `${ballState.height}px`,
            top: `${ballState.top}px`,
            left: `${ballState.left}px`
        }
        return(
            <div id = 'Ball' style = {BallStyle} >

            </div>
        )
    }
}

export default Ball;