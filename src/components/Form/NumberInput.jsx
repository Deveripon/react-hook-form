const NumberInput = ({ value, onChange, ...args }) => {
    function handleChange(e) {
        const value = e.target.valueAsNumber || 0;
        onChange(value);
    }

    return (
        <input
            type='number'
            min={0}
            onChange={handleChange}
            value={value}
            {...args}
        />
    );
};
export default NumberInput;
