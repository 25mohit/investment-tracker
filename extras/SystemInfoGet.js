const os = require('os')

const SystemInfo = () => {

    const userSystemInfo = {
        OS: os.cpus()[0],
        HOST: os.hostname(),
        TOTAL_MEMORY: {
            GB: os.totalmem()/1024/1024/1024,
            BYTES: os.totalmem()
        },
        NETWORK_HOST: os.networkInterfaces(),
        OS_HOST: os.release()
    }

    return userSystemInfo

}

module.exports = SystemInfo