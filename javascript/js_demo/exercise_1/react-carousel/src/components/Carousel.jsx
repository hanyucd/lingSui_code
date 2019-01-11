import React from 'react';
import img_1 from '../assets/11.jpg';
import img_2 from '../assets/22.jpg';
import img_3 from '../assets/33.jpg';
import img_4 from '../assets/44.jpg';
import img_5 from '../assets/55.jpg';
import img_6 from '../assets/66.jpg';
import img_7 from '../assets/77.jpg';

import './Carousel.css';
import { timingSafeEqual } from 'crypto';

// 轮播图
export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgs: [
                img_1, img_2, img_3, img_4, img_5, img_6, img_7
            ],
            showIndex: 0, //显示第几个图片
            timer: null, // 定时器
            show: false // 前后按钮显示
        }
    }
    componentDidMount() {
        this._start();
    }
    componentWillUnmount() {
        this._stop();
    }

    handleChange(index) {
        this.setState({
            showIndex: index
        });
    }

    _start = () => {
        let { timer } = this.state;
        timer = setInterval(() => {
            this.next();
        }, 3000);

        this.setState({ timer });
    }

    _stop = () => {
        let { timer } = this.state;
        timer && clearInterval(timer);
    }

    prev = () => {
        let { showIndex, imgs } = this.state;
        showIndex <= 0 ? showIndex = imgs.length - 1 : showIndex--;
        this.setState(() => ({showIndex}));
    }

    next = () => {
        let { showIndex, imgs } = this.state;
        if (showIndex >= imgs.length - 1) {
            showIndex = 0;
        } else {
            showIndex++;
        }
        this.setState(() => ({showIndex}));
    }

    render() {
        return (
            <div id="carousel-container">
                <section className="contain"
                    onMouseEnter={ this._stop }
                    onMouseLeave={ this._start }
                >
                    <ul className="ul">
                        {
                            this.state.imgs.map((imgPath, index) => (
                                <li className={ index === this.state.showIndex ? 'show' : '' } key={ index }>
                                    <img src={ imgPath } width="100%" height="100%" />
                                </li>
                            ))
                        }
                    </ul>
                    <ul className="dots">
                        {
                            this.state.imgs.map((_, index) => (
                                <li
                                    key={ index.toString() }
                                    className={ index === this.state.showIndex ? 'active' : '' }
                                    onClick={ this.handleChange.bind(this, index) }
                                >
                                </li>
                            ))
                        }
                    </ul>
                    <article className="control">
                        <span className="left" onClick={ this.prev }>左</span>
                        <span className="right" onClick={ this.next }>右</span>
                    </article>
                </section>
            </div>
        );
    }
}
