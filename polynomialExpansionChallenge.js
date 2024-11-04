function PolynomialExpansion(str) {
    // this solution works only if the str expression have 2 brackets, with whole numbers (not decimal) and one variable letter

    // STEPS
    // 1. variable base identification process
    // 2. spliting the polynomials exp process FX and GX exp string
    // 3. FX & GX string to collections process ex ["2x^2","-4x","+3"]
    // 4. maping on each collection and making each node as Term Obj
    // 5. Adding same degree terms ex [{-5x},{7x}] => [{2x}] for each collection
    // 6. sort collection from high to low degree
    // 7. multiplication of collection to form PX
    // 8. adding terms in PX
    // 9. PX string result

    // 1
    function getBase(exp) {
        // hay el function it returns the var base in the poly exp
        // ya3ne it returns the first letter
        const reg = /^[a-zA-z]/;
        for (let i = 0; i < exp.length; i++) {
            if (reg.test(exp[i])) return exp[i]
        }
        return null
    }

    // 2
    var [fxStr, gxStr] = str.split(')(')
    fxStr = fxStr.replace("(", "")
    gxStr = gxStr.replace(")", "")

    // 3
    function splitTerms(input = "") {
        // split if befor +- is not ^ symbol and after +- is a number
        return input.split(/(?<!\^)(?=[+-]\d)/)
    }
    var fxCol = splitTerms(fxStr)
    var gxCol = splitTerms(gxStr)

    // 4
    function getExpr(base, coef, deg) {
        // return the polunomial expresion as a string
        if (deg < 0 || deg >= 2) {
            return `${coef.toString()}${base}^${deg.toString()}`
        } else {
            if (deg === 1) {
                return `${coef.toString()}${base}`
            } else {
                if (deg === 0) {
                    return `${coef.toString()}`
                }
            }
        }
    }

    function termify(input = "") {
        // takes term expr as string and turns it to term obj
        var term = {
            base: getBase(input),
            expr: input,
            coef: null,
            deg: null
        }

        // if deg >= 2
        if (input.includes(`${term.base}^`)) {
            let [c, d] = input.split(`${term.base}^`)
            term.coef = parseInt(c)
            term.deg = parseInt(d)
            term.expr = getExpr(term.base, term.coef, term.deg)
            return term
        } else {
            // iza el deg is one ya3ne ex 3X or 12X
            if (input.includes(term.base)) {
                let c = input.slice(0, input.indexOf(term.base))
                // try to replace the base with empty
                term.coef = parseInt(c)
                term.deg = 1
                term.expr = getExpr(term.base, term.coef, term.deg)
                return term
            } else {
                // iza no variables only contants
                term.coef = parseInt(input)
                term.deg = 0
                term.expr = getExpr(term.base, term.coef, term.deg)
                return term
            }
        }

    }

    fxCol = fxCol.map(node => termify(node))
    gxCol = gxCol.map(node => termify(node))

    // 5
    function addCoef(col = []) {
        // all nodes must be of same deg and base
        if (col.length === 0) return []
        if (col.length === 1) return col
        let term = {
            base: col[0].base,
            expr: null,
            coef: null,
            deg: col[0].deg
        }

        if (col.length >= 2) {
            for (node of col) {
                term.coef += node.coef
            }

            term.expr = getExpr(term.base, term.coef, term.deg)
            return [term]
        }

        return col


    }

    function addTerms(col = []) {
        // it takes a col of terms, it adds all terms of same deg and base
        // it takes a col of diff deg terms
        // then we filter each term into a collection
        // we indicate the min and max degree range ex ( -5 => 6)
        // mish beldarora all the deg exist
        // from dmax => dmin
        // make coll of same deg and add coef
        // then push to px[]


        // degree collections
        var d0 = addCoef(col.filter(node => node.deg === 0))
        var d1 = addCoef(col.filter(node => node.deg === 1))
        var dn = []
        var dnv = [] // for negative deg

        var dmin = col.reduce((a, b) => (a.deg < b.deg ? a : b))
        var dmax = col.reduce((a, b) => (a.deg > b.deg ? a : b))

        var subDeg = []
        // loop on +ve deg
        for (let i = dmax.deg; i >= 2; i--) {
            subDeg = col.filter(node => (node.deg < 0 || node.deg >= 2) && (node.deg === i && node.deg !== 0 && node.deg !== 1))
            if (subDeg.length >= 1) { dn.push(...addCoef(subDeg)) }
        }

        // loop on -ve deg
        for (let i = -1; i >= dmin.deg; i--) {
            subDeg = col.filter(node => (node.deg < 0 || node.deg >= 2) && (node.deg === i && node.deg !== 0 && node.deg !== 1))
            if (subDeg.length >= 1) { dnv.push(...addCoef(subDeg)) }
        }

        // sort manually the order of deg
        return [...dn, ...d1, ...dnv, ...d0]

    }

    fxCol = addTerms(fxCol)
    gxCol = addTerms(gxCol)

    function multiplyCoef(a, b) {
        return {
            coef: a.coef * b.coef,
            deg: a.deg + b.deg,
            base: a.base,
            expr: getExpr(a.base, (a.coef * b.coef), (a.deg + b.deg))
        }
    }

    function multiplyTerms() {

        var px = []
        for (a of fxCol) {
            for (b of gxCol) {
                px.push(multiplyCoef(a, b))
            }
        }
        return px

    }

    var expandedForm = multiplyTerms()
    expandedForm = addTerms(expandedForm)

    var px = ""

    for (node of expandedForm) {
        px += "+" + node.expr
    }

    px = px.replaceAll("null", getBase(str))
    px = px.replaceAll("+-", "-")
    px = px.replaceAll("++", "+")
    px = px.replaceAll(`+1${getBase(str)}`, getBase(str))
    px = px.replaceAll(`-1${getBase(str)}`, `-${getBase(str)}`)

    if (px.startsWith('+')) px = px.slice(1, px.length)

    return px


}

// RUN
console.log(PolynomialExpansion("(2x^2-5x+3)(4x^3+6x^-1-2x+2)"));

