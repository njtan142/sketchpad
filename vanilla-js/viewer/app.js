const createRow = (container, name, id, contents) => {
    const row = document.createElement('div')
    row.classList.add('data-row')
    row.id = id
    populateRow(row, id, 2, ['data-name', 'data-contents'], ['name', 'contents'])
    const contentContainer = row.querySelector('#' + 'contents' + '-' + id)
    const nameContainer = row.querySelector('#' + 'name' + '-' + id)
    nameContainer.innerHTML = name
    populateWithImages(contentContainer, contents)
    container.appendChild(row)
}

const populateRow = (container, id, size, classnames, id_prefixes) => {
    for (let i = 0; i < size; i++) {
        const column = document.createElement('div')
        column.classList.add(classnames[i])
        column.id = id_prefixes[i] + '-' + id
        container.appendChild(column)
    }
}

const populateWithImages = (container, contents) => {
    for (let content of contents) {
        const { id, label } = content
        const img = document.createElement('img');
        img.src = '../' + constants.IMAGES_DIRECTORY + '/' + id + '.png'
        img.classList.add('thumbnail')
        img.id = label + '-' + id + '-' + 'img'
        img.loading = "lazy"
        container.appendChild(img)
    }
}


const {samples, featuresNames} = features;

const groups = utils.groupDatasetBy('student_id', samples)
const dataContainer = document.getElementById('dataset-container')
for (let id in groups) {
    const contents = groups[id]
    const name = contents[0].student_name
    createRow(dataContainer, name, id, contents)
}