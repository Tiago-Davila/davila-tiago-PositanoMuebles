export const generarId = (registros) => {
    if (registros.length === 0) {
        return 1;
    }

    return Math.max(...registros.map((registro) => registro.id)) + 1;
};

export default generarId;
