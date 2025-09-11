import React, { Component } from "react";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { SliderRail, Handle, Track } from "./SliderComponents";

const sliderStyle = {
  position: "relative" as "relative",
  width: "100%",
};

// eslint-disable-next-line
type DoubleSliderChangeHandler = (values: ReadonlyArray<number>) => void;

interface DoubleSlideProps {
  onChange: DoubleSliderChangeHandler;
  disabled?: boolean;
  min?: number;
  max?: number;
}

interface SliderState {
  domain: Array<number>;
  values: ReadonlyArray<number>;
  update: ReadonlyArray<number>;
  reversed: boolean;
}

export class DoubleSlider extends Component<DoubleSlideProps, SliderState> {
  constructor(props: DoubleSlideProps) {
    super(props);

    const defaultValues = [props.min, props.max] as Array<number>;

    this.state = {
      domain: defaultValues,
      values: defaultValues.slice(),
      update: defaultValues.slice(),
      reversed: false,
    };
  }

  defaultProps = {
    min: 100,
    max: 1000,
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
      state: { domain, values, reversed },
    } = this;

    return (
      <div className="relative h-12 ">
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
                {handles.map((handle, index) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                    disabled={this.props.disabled}
                    label={index === 0 ? "min" : "max"}
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
        </Slider>
      </div>
    );
  }
}
