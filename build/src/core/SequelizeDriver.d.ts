/**
 * Sequelize database connection driver
 *
 * @export
 * @class Driver
 */
export declare class SequelizeDriver {
    private static _sequelizeDep;
    /**
     * Connect to database interface
     *
     * @static
     * @param {any} args
     * @returns
     */
    static connect(...args: any[]): any;
    /**
     * Get sequelize dependency class
     *
     * @readonly
     * @static
     * @type {*}
     */
    static readonly sequelize: any;
}
