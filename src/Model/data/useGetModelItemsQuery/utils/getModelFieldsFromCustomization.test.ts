import { fakeTestData } from '../../../../shared/tests/fakeData';
import { filterModelFieldsFromCustomization } from './getModelFieldsFromCustomization'
import { test, expect } from 'vitest'

const getCustomization = ({ showPassword, showLogin }: { showLogin: boolean, showPassword: boolean }) => {
    return {
        "User": {
            "title": "User Test",
            "fields": {
                "id": {
                    "title": "Identity",
                    "actions": {
                        "create": false,
                        "update": false
                    },
                },
                "password": {
                    "title": "The Password",
                    "tableView": {
                        "read": showPassword,
                        "sort": false,
                        "filter": false
                    }
                },
                "login": {
                    "title": "The Login",
                    "tableView": {
                        "read": showLogin,
                        "sort": false,
                        "filter": false
                    }
                },
            },
            "idField": "id",
            "displayFields": [
                "id",
                "email",
            ]
        }
    }
}

test('Removing fields from read', async () => {
    const model = fakeTestData.models.find(el => el.name === "User")

    const customization1 = getCustomization({ showPassword: false, showLogin: true })
    const fieldsFromCustomizations1 = filterModelFieldsFromCustomization(model, "tableView.read", customization1)
    expect(fieldsFromCustomizations1.find(el => el.name === "login")).toBeTruthy()
    expect(fieldsFromCustomizations1.find(el => el.name === "password")).toBeFalsy()
    
    const customization2 = getCustomization({ showPassword: false, showLogin: false })
    const fieldsFromCustomizations2 = filterModelFieldsFromCustomization(model, "tableView.read", customization2)
    expect(fieldsFromCustomizations2.find(el => el.name === "login")).toBeFalsy()
    expect(fieldsFromCustomizations2.find(el => el.name === "password")).toBeFalsy()

});