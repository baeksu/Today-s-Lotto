"use strict";

/**
 * 1차 요구사항 정리
 * - "Pick One" 버튼을 누르면 공을 하나 뽑는다. (이미 뽑힌공은 다시 뽑으면 안된다.)
 * - 만약 6개 모두를 뽑았으면 모달창을 하나 띄워주자. ("다시 뽑을지, 아니면 그대로 멈출지")
 * - "Pick All" 버튼을 누르면 남아있는 횟수만큼 공을 뽑아준다.
 *
 * 2차 요구사항 정리
 * - 선택한 공을 로또 머신에서 제거하고 해당 공의 색깔로 span 태그를 채워준다.
 *
 */

let checkPickedBalls = new Array(30).fill(0);
let pickedBallCount = 0;
let pickedBalls = [];

document.querySelector("#pick-one-button").addEventListener("click", pickOneBall);
document.querySelector("#pick-all-button").addEventListener("click", pickAllBall);

function pickOneBall() {
    //이미 6개를 뽑았는지 검증
    if (!checkValidNum()) {
        return;
    }
    let pickedNum = 0;
    while (true) {
        pickedNum = Math.trunc(Math.random() * 45) + 1;

        //한번도 뽑은 적이 없는 공이라면 while 종료.
        if (!checkPickedBalls[pickedNum]) {
            checkPickedBalls[pickedNum] = 1;
            pickedBallCount++;
            pickedBalls.push(pickedNum);
            document.querySelector(`#ball-${pickedBallCount}`).textContent = pickedNum;
            break;
        }
    }
}

function pickAllBall() {
    if (!checkValidNum()) {
        return;
    }

    while (true) {
        //이미 6개를 뽑았는지 검증
        if (pickedBallCount >= 6) break;

        let pickedNum = 0;

        pickedNum = Math.trunc(Math.random() * 45) + 1;

        //한번도 뽑은 적이 없는 공이라면 while 종료.
        if (!checkPickedBalls[pickedNum]) {
            checkPickedBalls[pickedNum] = 1;
            pickedBallCount++;
            pickedBalls.push(pickedNum);
            document.querySelector(`#ball-${pickedBallCount}`).textContent = pickedNum;
        }
    }
}

function checkValidNum() {
    if (pickedBallCount >= 6) {
        let res = confirm("이미 6개의 공을 모두 뽑았습니다. 다시 뽑으시겠습니까?");
        if (res) {
            pickedBallCount = 0;
            checkPickedBalls = new Array(30).fill(0);
            pickedBalls = [];

            //선택한 공들을 모두 지워주고
            for (let i = 1; i <= 6; i++) {
                document.querySelector(`#ball-${i}`).textContent = `${i}번 공`;
            }
        }
        return false;
    }
    return true;
}
