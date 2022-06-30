import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./SliderComponents";

const sliderStyle = {
  position: "relative" as "relative",
  width: "100%",
};

const defaultValues = [100, 500];

interface DoubleSlideProps {
  onChange: (values: ReadonlyArray<number>) => void;
  disabled?: boolean;
}

interface SliderState {
  domain: ReadonlyArray<number>;
  values: ReadonlyArray<number>;
  update: ReadonlyArray<number>;
  reversed: boolean;
}

export class DoubleSlider extends Component<DoubleSlideProps, SliderState> {
  state = {
    domain: [100, 500],
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    reversed: false,
  };

  onUpdate = (update: ReadonlyArray<number>) => {
    this.setState({ update });
  };

  onChange = (values: ReadonlyArray<number>) => {
    this.setState({ values });
    this.props.onChange(values);
  };

  setDomain = (domain: number[]) => {
    this.setState({ domain });
  };

  toggleReverse = () => {
    this.setState((prev) => ({ reversed: !prev.reversed }));
  };

  render() {
    const {
      state: { domain, values, update, reversed },
    } = this;

    return (
      <div style={{ height: 150, width: "100%" }}>
        {/* <button
          onClick={() => {
            this.onChange([200, 300]);
            this.onUpdate([200, 300]);
          }}
        >
          SET VALUES [200, 300]
        </button>
        <button
          onClick={() => {
            this.onChange([350, 450]);
            this.onUpdate([350, 450]);
          }}
        >
          SET VALUES [350, 450]
        </button>
        <button onClick={() => this.toggleReverse()}>
          {reversed ? "DISPLAY LOW TO HIGH" : "DISPLAY HIGH TO LOW"}
        </button> */}
        {/* <ValueViewer values={values} update={update} /> */}
        <Slider
          mode={2}
          step={1}
          domain={domain}
          reversed={reversed}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={this.onChange}
          values={values}
          disabled={this.props.disabled}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    disabled={this.props.disabled}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                    disabled={this.props.disabled}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks values={[1, 500]}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick
                    key={tick.id}
                    tick={tick}
                    count={ticks.length}
                    disabled={this.props.disabled}
                  />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    );
  }
}
