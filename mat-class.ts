export class Mtx {
    public m: number[][]
    constructor(m: number[][]) {
        this.m = m
    }
    // preety print of matrix
    pprint(): void {
        this.m.map(r => console.log(r))
    }
    // length of matrix or row of a amtrix
    ndim(): number {
        return this.m.length

    }
    // a tuple of nrows and ncols of matrix
    shape(): [number, number] {
        const r = this.m.length
        const c = this.m[0].length
        return [r, c]
    }
    private createMat(nrows: number, ncols: number): number[][] {
        let nm: number[][] = []
        for (let i = 0; i < nrows; i++) {
            nm.push([])
            for (let j = 0; j < ncols; j++) {
                nm[i].push(0)

            }

        }
        return nm
    }

    add(m: number[][], n: number[][]): Mtx {
        if (n.length !== m.length) {
            throw new Error("can not add to matrices with different dimension")
        }
        let nm = this.createMat(m.length, m[0].length)
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < n.length; j++) {
                nm[i][j] = m[i][j] + n[i][j]
            }

        }

        return new Mtx(nm)

    }
    sub(m: number[][], n: number[][]): Mtx {
        if (n.length !== m.length) {
            throw new Error("can not add two matrices with different dimension")
        }
        let nm = this.createMat(m.length, m[0].length)
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < n.length; j++) {
                nm[i][j] = m[i][j] - n[i][j]
            }

        }

        return new Mtx(nm)

    }
    mul(m: number[][], n: number[][]): Mtx {
        if (m[0].length !== n.length) {
            throw new Error("can not multiply two matrices that do not have ncols od mat1 equal nrows to mat2")
        }
        let nm = this.createMat(m.length, n[0].length)
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < n[0].length; j++) {
                let product = 0
                for (let k = 0; k < m[0].length; k++) {
                    product += m[i][k] * n[k][j]

                }
                nm[i][j] = product

            }

        }

        return new Mtx(nm)

    }
    smul(m: number[][], s: number): Mtx {
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[0].length; j++) {
                m[i][j] *= s

            }

        }
        return new Mtx(m)
    }
    transpose(m: number[][]): Mtx {
        let mt: number[][] = this.createMat(m[0].length, m.length)
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[0].length; j++) {
                mt[j][i] = m[i][j]

            }
        }

        return new Mtx(mt)
    }
    trace(m: number[][]): number {
        if (m.length !== m[0].length) {
            throw new Error("matrix is not a square matrix")

        }
        let T = 0
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[0].length; j++) {
                if (i === j) {
                    T += m[i][j]
                }
            }
        }
        return T

    }
    diag(m: number[][]): number[] {

        if (m.length !== m[0].length) {
            throw new Error("matrix is not a square matrix")

        }
        const arr: number[] = []
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[0].length; j++) {
                if (i === j) {
                    arr.push(m[i][j])
                }
            }
        }
        return arr
    }
    identity(): Mtx {
        const n = this.m.length
        let mt = this.createMat(n, n)
        for (let i = 0; i < mt.length; i++) {
            for (let j = 0; j < mt.length; j++) {
                if (i === j) {
                    mt[i][j] = 1

                }

            }

        }

        return new Mtx(mt)

    }
}


const mat = new Mtx([[1, 2], [3, 4], [5, 6]])
// mat.identity().pprint();



mat.pprint();
console.log(mat.ndim());
console.log(mat.shape());
const a = mat.sub([[1, 2], [3, 4], [2, 5]], [[5, 6], [7, 8], [1, 2]]);
a.pprint();
console.log(a.shape())
console.log("------------");

const b = mat.add([[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
b.pprint();
console.log(b.shape())

console.log("------------");
const A = [[1, 2, 3], [4, 5, 6]]
const B = [[7, 8], [9, 10], [11, 12]]

const c = mat.mul(A, B);
c.pprint();
// console.log(c.shape())


// const mtt = [[1, 1, 2], [1, 2, 1], [2, 1, 1]]
console.log("------------");

const s = [[10, 6], [4, 3]]


mat.smul(s, 2).pprint()

console.log("------------");

const T = [[2, -9, 3], [13, 11, -17], [3, 6, 15], [4, 13, 1]]
mat.transpose(T).pprint()
console.log(mat.trace(s))

console.log(mat.diag([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));

