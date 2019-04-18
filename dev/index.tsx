import * as React from 'react';
import ReactPanZoom from '../src/react-pan-zoom-rotate';
import styled, { css } from 'styled-components';

const Container = css`
  width: 440px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & img {
    width: 100%;
  }
`;
const ControlsContainer = styled.div`
  position: absolute;
  right: 10px;
  z-index: 2;
  top: 10px;
  user-select: none;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(53, 67, 93, 0.32);
  & div {
    text-align: center;
    cursor: pointer;
    height: 40px;
    border-bottom: 1px solid #f4f4f4;
    & svg {
      height: 40px;
      width: 40px;
      padding: 5px;
    }
    &:last-child {
      border: none;
    }
    &:active {
      box-shadow: 0px 2px 6px blue;
    }
  }
`;

interface IProps {
  image: string;
}

export default class PanViewer extends React.Component<IProps> {
  public state = {
    dx: 0,
    dy: 0,
    zoom: 1,
    rotation: 0,
  };

  // tslint:disable-next-line: member-ordering
  public renderPanZoomControls = () => {
    return (
      <ControlsContainer>
        <div onClick={this.zoomIn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M12 4L12 20"
              stroke="#4C68C1"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div onClick={this.zoomOut}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div onClick={this.rotateLeft}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 15L9 20L4 15"
              stroke="#4C68C1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M20 4H13C10.7909 4 9 5.79086 9 8V20"
              stroke="#4C68C1"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </ControlsContainer>
    );
  };
  public componentDidMount() {
    document.addEventListener('keypress', e => {
      if (e.keyCode === 43) {
        this.zoomIn();
      } else if (e.keyCode === 45) {
        this.zoomOut();
      } else if (e.keyCode === 114 || e.keyCode === 82) {
        this.rotateLeft();
      }
    });
  }
  public render() {
    const StyledReactPanZoom = styled(ReactPanZoom)`
      ${Container};
    `;
    return [
      this.renderPanZoomControls(),

      <StyledReactPanZoom
        zoom={this.state.zoom}
        pandx={this.state.dx}
        pandy={this.state.dy}
        onPan={this.onPan}
        rotation={this.state.rotation}
        key={this.state.dx}
      >
        <img
          style={{
            transform: `rotate(${this.state.rotation * 90}deg)`,
          }}
          src={this.props.image}
          alt=""
        />
      </StyledReactPanZoom>,
    ];
  }

  public zoomIn = () => {
    console.log(this.state.zoom);
    if (this.state.zoom < 2) {
      this.setState({
        zoom: this.state.zoom + 0.2,
      });
    }
  };

  public zoomOut = () => {
    if (this.state.zoom >= 1) {
      this.setState({
        zoom: this.state.zoom - 0.2,
      });
    }
  };
  public rotateLeft = () => {
    if (this.state.rotation === -3) {
      this.setState({
        rotation: 0,
      });
    } else {
      this.setState({
        rotation: this.state.rotation - 1,
      });
    }
  };

  public onPan = (dx: number, dy: number) => {
    this.setState({
      dx,
      dy,
    });
  };
}
