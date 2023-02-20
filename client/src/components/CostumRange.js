import React from "react";
import { Range, getTrackBackground } from "react-range";

const CostumRange = ({ value, step, min, max, onChange }) => {
    let state = { values: [50] };
    return (
        <Range
            draggableTrack
            step={step}
            min={min}
            max={max}
            values={[value]}
            onChange={(values) => {
                value = values[0]
                // console.log(value)
            }
            }
            renderTrack={({ props, children }) => (
                <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%"
                    }}
                >
                    <div
                        ref={props.ref}
                        style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                                values: [value],
                                colors: ["#1db954", "#535353"],
                                min: min,
                                max: max
                            }),
                            alignSelf: "center"
                        }}
                    >
                        {children}
                    </div>
                </div>
            )}
            renderThumb={({ props, isDragged }) => (
                <div className={` h-3 w-3 rounded-full bg-white ${!isDragged ? 'opacity-0' : ''} group-hover:opacity-100 `}
                    {...props}
                    style={{
                        ...props.style,
                        boxShadow: "0px 2px 4px 0 rgba(0, 0, 0, 0)",
                        opacity: 0
                    }}
                >
                    <div
                    />
                </div>
            )}
        />
    );
}

export default CostumRange