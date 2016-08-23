/**
 * Decorator for @Entity
 * here we compose all the metadata into SequelizeEntityPool.
 * Everytime, it just composes its own Entity.
 *
 * @export
 * @param {*} target
 */
export declare function Entity(target: Function): void;
