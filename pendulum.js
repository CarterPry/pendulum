class Pendulum {
    constructor(n = 2, thetas = [0.5 * Math.PI, 0.5 * Math.PI], thetaDots = [0, 0], g = 9.8) {
        this.n = n;
        this.thetas = thetas;
        this.thetaDots = thetaDots;
        this.g = g;
    }

    A(thetas) {
        const M = [];
        for (let i = 0; i < this.n; i++) {
            const row = [];
            for (let j = 0; j < this.n; j++) {
                row.push((this.n - Math.max(i, j)) * Math.cos(thetas[i] - thetas[j]));
            }
            M.push(row);
        }
        return M;
    }

    b(thetas, thetaDots) {
        const v = [];
        for (let i = 0; i < this.n; i++) {
            let b_i = 0;
            for (let j = 0; j < this.n; j++) {
                b_i -= (this.n - Math.max(i, j)) * Math.sin(thetas[i] - thetas[j]) * thetaDots[j] ** 2;
            }
            b_i -= this.g * (this.n - i) * Math.sin(thetas[i]);
            v.push(b_i);
        }
        return v;
    }

    f(thetas, thetaDots) {
        const A = this.A(thetas);
        const b = this.b(thetas, thetaDots);
        return [thetaDots, math.lusolve(A, b).map(x => x[0])];
    }

    RK4(dt, thetas, thetaDots) {
        const k1 = this.f(thetas, thetaDots);
        const k2 = this.f(math.add(thetas, k1[0].map(x => 0.5 * dt * x)), math.add(thetaDots, k1[1].map(x => 0.5 * dt * x)));
        const k3 = this.f(math.add(thetas, k2[0].map(x => 0.5 * dt * x)), math.add(thetaDots, k2[1].map(x => 0.5 * dt * x)));
        const k4 = this.f(math.add(thetas, k3[0].map(x => dt * x)), math.add(thetaDots, k3[1].map(x => dt * x)));

        const thetaDeltas = math.add(k1[0], k2[0].map(x => 2 * x), k3[0].map(x => 2 * x), k4[0]).map(x => x * dt / 6);
        const thetaDotDeltas = math.add(k1[1], k2[1].map(x => 2 * x), k3[1].map(x => 2 * x), k4[1]).map(x => x * dt / 6);

        return [math.add(thetas, thetaDeltas), math.add(thetaDots, thetaDotDeltas)];
    }

    tick(dt) {
        [this.thetas, this.thetaDots] = this.RK4(dt, this.thetas, this.thetaDots);
    }

    get coordinates() {
        let x = 0;
        let y = 0;
        const coords = [];

        for (const theta of this.thetas) {
            x += Math.sin(theta);
            y -= Math.cos(theta);
            coords.push({ x, y });
        }

        return coords;
    }
}