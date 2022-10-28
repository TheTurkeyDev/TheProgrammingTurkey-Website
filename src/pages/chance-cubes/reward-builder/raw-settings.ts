import { ChanceCubesRewardSettings } from '../../../types/chance-cubes/chance-cubes-reward-settings';

export const settings: ChanceCubesRewardSettings = {
    'Block': [
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0, description: 'Block offset in the x direction from the location of the broken chance cube, or the player' },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0, description: 'Block offset in the y direction from the location of the broken chance cube, or the player' },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0, description: 'Block offset in the z direction from the location of the broken chance cube, or the player' },
        { key: 'block', display: 'Block', type: 'text', default: 'minecraft:dirt', description: 'Id of the block to place' },
        { key: 'falling', display: 'Falling', type: 'boolean', default: false, description: 'Whether or not the block should fall into place, or be placed directly' },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false, description: "If enabled, the offsets will be relative to the player's location and not the chance cube's" },
        { key: 'removeUnbreakableBlocks', display: 'Remove Unbreakable Blocks', type: 'boolean', default: false, description: 'If enabled, placed blocks can replace unbreakable blocks.' },
        { key: 'playSound', display: 'Play Sound', type: 'boolean', default: true, description: 'Play the sound of the block being placed' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the block gets placed' }
    ],
    'Message': [
        { key: 'message', display: 'Message', type: 'text', default: '', description: 'Message to be sent' },
        { key: 'serverWide', display: 'Server Wide', type: 'boolean', default: false, description: 'If enabled sends the message to all players on the server' },
        { key: 'range', display: 'Range', type: 'number', default: 32, min: 0, description: 'All Players within this amount of blocks will receive the message (server wide over rules this)' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the message is sent' }
    ],
    'Entity': [
        { key: 'entity', display: 'Entity', type: 'text', default: '', description: 'NBT data of the entity to spawn' },
        { key: 'removeBlocks', display: 'Remove Blocks', type: 'boolean', default: true, description: 'If enabled clears a 3x3x3 space around the cube to spawn the entities in' },
        { key: 'copies', display: 'Copies', type: 'number', default: 0, min: 0, description: 'Number of additional times this entity should be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the entity is spawned' }
    ],
    'Experience': [
        { key: 'experienceAmount', display: 'Experience Amount', type: 'number', default: 1, description: 'Amount of experience in total in all the orbs' },
        { key: 'numberOfOrbs', display: 'Number Of Orbs', type: 'number', default: 1, description: 'Number of orbs to spawn' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the experience is spawned' }
    ],
    'Item': [
        { key: 'item', display: 'Item NBT', type: 'nbt', default: {}, description: 'NBT of the item to be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the item is spawned' }
    ],
    'Command': [
        { key: 'command', display: 'Command', type: 'text', default: '/help', description: 'Command to be run. Placeholder values: TDB' },
        { key: 'copies', display: 'Copies', type: 'number', default: 0, min: 0, description: 'Number of additional times the command should be run' },
        { key: 'copiesSoft', display: 'Copies Soft', type: 'boolean', default: false, description: 'If enabled, the additional runs of the command will regenerate their dynamic values' },
        { key: 'relativeToPlayer', display: 'Relative To Player', type: 'boolean', default: false, description: 'If enabled, the command will be run in reference to the player\'s location and not the cube\'s' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the command is run' }
    ],
    'Potion': [
        { key: 'potionid', display: 'Potion ID', type: 'text', default: 'speed', description: 'Id of the potion to be spawned in' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the potion is spawned' }
    ],
    'Sound': [
        { key: 'sound', display: 'Sound', type: 'text', default: '', description: 'Id of the sound to play' },
        { key: 'serverWide', display: 'Server Wide', type: 'boolean', default: false, description: 'If enabled, play the sound server wide' },
        { key: 'range', display: 'Range', type: 'number', default: 16, min: 0, description: 'All Players within this amount of blocks will hear the sound (server wide over rules this)' },
        { key: 'playAtPlayersLocation', display: 'Play At Players Location', type: 'boolean', default: false, description: "The source of the sound is at the players location instead of the Chance Cube's location" },
        { key: 'volume', display: 'Volume', type: 'decimal', default: 1, min: 0, max: 1, description: 'volume of the sound' },
        { key: 'pitch', display: 'Pitch', type: 'decimal', default: 1, min: 0, max: 1, description: 'Pitch of the sound' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the sound is played' }
    ],
    'Schematic': [
        { key: 'fileName', display: 'File Name', type: 'text', default: '', description: 'Name of the file to load in' },
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0, description: 'Schematic center offset in the x direction from the location of the broken chance cube, or the player' },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0, description: 'Schematic bottom in the y direction from the location of the broken chance cube, or the player' },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0, description: 'Schematic center offset in the z direction from the location of the broken chance cube, or the player' },
        { key: 'falling', display: 'Falling', type: 'boolean', default: true, description: 'Whether or not the blocks should fall into place, or be placed directly' },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false, description: '' },
        { key: 'includeAirBlocks', display: 'Include Air Blocks', type: 'boolean', default: false, description: '' },
        { key: 'playSound', display: 'Play Sound', type: 'boolean', default: true, description: '' },
        { key: 'spacingDelay', display: 'Spacing Delay', type: 'decimal', default: 0.1, min: 0, description: '' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the structure begins building' }
    ],
    'Chest': [
        { key: 'item', display: 'Item', type: 'text', default: 'minecraft:dirt', description: '' },
        { key: 'amount', display: 'Amount', type: 'number', default: 1, min: 0, description: '' },
        { key: 'chance', display: 'Chance', type: 'number', default: 50, min: 0, max: 100, description: '' }
    ],
    'Particle': [
        { key: 'particle', display: 'Particle', type: 'text', default: 'explode', description: '' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the particle is spawned' }
    ],
    'Effect': [
        { key: 'potionid', display: 'Potion ID', type: 'text', default: 'speed', description: '' },
        { key: 'duration', display: 'Duration', type: 'number', default: 1, min: 0, description: '' },
        { key: 'amplifier', display: 'Amplifier', type: 'number', default: 0, min: 0, description: '' },
        { key: 'radius', display: 'Radius', type: 'number', default: 1, min: 0, description: '' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the effect is given' }
    ],
    'Title': [
        { key: 'message', display: 'Message', type: 'text', default: '', description: '' },
        { key: 'type', display: 'Type', type: 'text', default: 'TITLE', description: '' },
        { key: 'fadeInTime', display: 'Fade In Time', type: 'number', default: 0, min: 0, description: '' },
        { key: 'displayTime', display: 'Display Time', type: 'number', default: 0, min: 0, description: '' },
        { key: 'fadeOutTime', display: 'Fade Out Time', type: 'number', default: 0, min: 0, description: '' },
        { key: 'isServerWide', display: 'Server Wide', type: 'boolean', default: false, description: '' },
        { key: 'range', display: 'Range', type: 'number', default: 16, min: 0, description: '' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the title is placed' }
    ],
    'Area': [
        { key: 'xSize', display: 'X Size', type: 'number', default: 1, min: 0, description: '' },
        { key: 'ySize', display: 'Y Size', type: 'number', default: 1, min: 0, description: '' },
        { key: 'zSize', display: 'Z Size', type: 'number', default: 1, min: 0, description: '' },
        { key: 'block', display: 'Block', type: 'text', default: 'minecraft:dirt', description: '' },
        { key: 'xOffSet', display: 'X Offset', type: 'number', default: 0, description: '' },
        { key: 'yOffSet', display: 'Y Offset', type: 'number', default: 0, description: '' },
        { key: 'zOffSet', display: 'Z Offset', type: 'number', default: 0, description: '' },
        { key: 'falling', display: 'Falling', type: 'boolean', default: true, description: '' },
        { key: 'causesUpdate', display: 'Causes Update', type: 'boolean', default: false, description: '' },
        { key: 'relativeToPlayer', display: 'Relative to Player', type: 'boolean', default: false, description: '' },
        { key: 'delay', display: 'Delay', type: 'number', default: 0, min: 0, description: 'Delay amount (in ticks) from after the cube is broken till the blocks gets placed' }
    ],
    'Status': [

    ]
};