data class Attack(val base: Int, val critical: Boolean, val element: String, val targetArmor: Int)

fun damageOf(attack: Attack): Int {
    val elementBonus = bonusFor(attack.element)
    val criticalBonus = if (attack.critical) attack.base else 0
    val armorReduction = attack.targetArmor / 2

    val raw = attack.base + elementBonus + criticalBonus

    if (raw <= armorReduction) {
        return 1
    }

    return raw - armorReduction
}

fun bonusFor(element: String): Int {
    if (element == "fire") {
        return 7
    }
    if (element == "ice") {
        return 5
    }
    if (element == "shadow") {
        return 11
    }
    return 0
}
